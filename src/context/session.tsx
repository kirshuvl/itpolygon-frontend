import { Accessor, ParentComponent, createContext, createSignal, onCleanup, onMount, useContext } from "solid-js";
import { useSnackbarStateContext } from "./snackbar";
import { getAccessToken, getRefreshToken, resetAccessToken, resetRefreshToken, setAccessToken, setRefreshToken } from "../api/session/apiSession";
import { apiSession } from "../api/session/apiSession";
import { debugMessage } from "../utils/Debug";

type SessionStateContextType = {
    isAuthenticated: Accessor<boolean>;
    isSessionLoaded: Accessor<boolean>;
    actions: {
        signIn: ({ email, password }: { email: string; password: string }) => Promise<any>;
        signOut: () => void;
    };
};

const SessionStateContext = createContext<SessionStateContextType>();

export const SessionProvider: ParentComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = createSignal<boolean>(false);
    const [isSessionLoaded, setIsSessionLoaded] = createSignal<boolean>(false);
    const {
        actions: { addToast },
    } = useSnackbarStateContext();

    onMount(async () => {
        debugMessage("[onMount][Provider] Session");
        await loadSession();
    });

    onCleanup(() => {
        debugMessage("[onCleanup][Provider] Session");
    });

    const loadSession = async () => {
        try {
            const accessToken = getAccessToken();
            const refreshToken = getRefreshToken();

            if (!refreshToken) {
                resetAccessToken();
                resetRefreshToken();
                setIsAuthenticated(false);
                return null;
            }

            if (apiSession.isTokenNeedUpdate(refreshToken)) {
                resetAccessToken();
                resetRefreshToken();
                setIsAuthenticated(false);
                return null;
            }

            if (accessToken && !apiSession.isTokenNeedUpdate(accessToken)) {
                setIsAuthenticated(true);
                return null;
            }

            const tokens = await apiSession.refreshToken({ refreshToken });
            setAccessToken(tokens.access);
            setRefreshToken(tokens.refresh);
            setIsAuthenticated(true);

            return null;
        } catch (error) {
            console.error("[loadSession Error]", error);
            resetAccessToken();
            resetRefreshToken();
            setIsAuthenticated(false);
            addToast({ title: `${error} -> это после изменения токена`, duration: 4000, type: "error" });
        } finally {
            setTimeout(() => {
                setIsSessionLoaded(true);
            }, 0);
        }
    };

    onCleanup(async () => {
        debugMessage("[onCleanup][Provider] Session");
    });

    const signIn = async ({ email, password }: { email: string; password: string }): Promise<any> => {
        try {
            const tokens = await apiSession.authLogin({ email, password });
            setIsAuthenticated(true);
            setAccessToken(tokens.access);
            setRefreshToken(tokens.refresh);
            addToast({ title: "Добро пожаловать!", duration: 2000, type: "success" });
            return true;
        } catch (error) {
            resetAccessToken();
            resetRefreshToken();
            setIsAuthenticated(false);
            addToast({ title: `${error}`, duration: 4000, type: "error" });
            return null;
        }
    };

    const signOut = async () => {
        // TODO: отсылать на сервер информацию о логауте для добавления токена в черный список
        resetAccessToken();
        resetRefreshToken();
        setIsAuthenticated(false);
        addToast({ title: "вы успешно вышли из аккаунта", duration: 2000, type: "success" });
    };

    const value = {
        isAuthenticated,
        isSessionLoaded,
        actions: {
            signIn,
            signOut,
        },
    };
    return <SessionStateContext.Provider value={value}>{props.children}</SessionStateContext.Provider>;
};

export function useSessionStateContext() {
    return useContext(SessionStateContext)!;
}
