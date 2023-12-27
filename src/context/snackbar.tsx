import { ParentComponent } from "solid-js";
import { createContext, useContext, createUniqueId, onCleanup, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { debugMessage } from "../utils/Debug";

export type Toast = {
    id?: string;
    type: "success" | "error" | "warning";
    title: string;
    duration: number;
};

type SnackbarStateContextType = {
    store: { snackbars: Toast[] };
    actions: {
        addToast: (toast: Toast) => void;
        removeToast: (id: string) => void;
    };
};

const SnackbarStateContext = createContext<SnackbarStateContextType>();

export const SnackbarProvider: ParentComponent = (props) => {
    const [store, setStore] = createStore<{ snackbars: Toast[] }>({ snackbars: [] });

    onMount(() => {
        debugMessage("[onMount][Provider] Snackbar");
    });

    onCleanup(() => {
        debugMessage("[onCleanup][Provider] Snackbar");
    });
    const addToast = (toast: Toast) => {
        setStore(
            "snackbars",
            produce((snackbars) => {
                snackbars.push({
                    id: createUniqueId(),
                    ...toast,
                });
            })
        );
    };

    const removeToast = (id: string) => {
        setStore(
            "snackbars",
            produce((snackbars) => {
                const index = snackbars.findIndex((snackbar) => snackbar.id === id);

                if (index > -1) {
                    snackbars.splice(index, 1);
                }
            })
        );
    };

    const value = {
        store,
        actions: {
            addToast,
            removeToast,
        },
    };

    return <SnackbarStateContext.Provider value={value}>{props.children}</SnackbarStateContext.Provider>;
};

export function useSnackbarStateContext() {
    return useContext(SnackbarStateContext)!;
}
