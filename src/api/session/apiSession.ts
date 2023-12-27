import { jwtDecode } from "jwt-decode";

type refreshToken = {
    refresh: string;
};

type accessToken = {
    access: string;
};

type infoToken = {
    detail?: string;
};

export type Tokens = refreshToken & accessToken & infoToken;

const ACCESS_TOKEN_LOCAL_STORAGE_KEY = "access";
const REFRESH_TOKEN_LOCAL_STORAGE_KEY = "refresh";

export const getAccessToken = (): string => {
    return localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
};

export const getRefreshToken = (): string => {
    return localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY);
};

export const setAccessToken = (token: string) => {
    if (!token) {
        console.error("setAccessToken: token is null!");
    }

    localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, token);
};

export const setRefreshToken = (token: string) => {
    if (!token) {
        console.error("setAccessToken: token is null!");
    }

    localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, token);
};

export const resetAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
};

export const resetRefreshToken = () => {
    localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY);
};

const createFormData = (data: { [key: string]: string }): FormData => {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }

    return formData;
};

export const apiSession = {
    authLogin: async ({ email, password }: { email: string; password: string }): Promise<Tokens> | null => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/token/get/", {
                method: "POST",
                body: createFormData({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.detail === "No active account found with the given credentials") {
                    throw new Error("Проверьтe почту и пароль");
                }

                throw new Error(`[apiSession.getToken] 401 error  ${response.statusText}`);
            }

            return data;
        } catch (error) {
            throw error;
        }
    },

    refreshToken: async ({ refreshToken }: { refreshToken: string }): Promise<Tokens> => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/token/refresh/", {
                method: "POST",
                body: createFormData({
                    refresh: refreshToken,
                }),
            });

            if (!response.ok) {
                throw new Error("Вы были на сайте, но кажется, вы что-то сделали не так. Зайди и выйди!");
            }

            return response.json();
        } catch (error) {
            throw error;
        }
    },
    isTokenNeedUpdate: (token: string): boolean => {
        const currentTime = Math.floor(Date.now() / 1000);
        const tokenExpiredTime = jwtDecode(token).exp;
        if (currentTime + 5 < tokenExpiredTime) {
            return false;
        }
        return true;
    },
};
