import axios from "axios";
import { Tokens, apiSession, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "./session/apiSession";
import { debugDelay } from "../utils/Debug";

const BASE_URL = "http://127.0.0.1:8000";

export default axios.create({
    baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
});

let refreshTokenPromise: Promise<Tokens> | null = null;

axiosPrivate.interceptors.request.use(
    async (config) => {
        let accessToken = getAccessToken();
        const refreshToken = getRefreshToken();
        await debugDelay();

        if (accessToken && apiSession.isTokenNeedUpdate(accessToken)) {
            if (!refreshTokenPromise) {
                refreshTokenPromise = apiSession.refreshToken({ refreshToken });
            }
            const newTokens = await refreshTokenPromise;
            accessToken = newTokens.access;
            setAccessToken(newTokens.access);
            setRefreshToken(newTokens.refresh);
            refreshTokenPromise = null;
        }
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        return config;
    },
    (error) => Promise.reject(error)
);
