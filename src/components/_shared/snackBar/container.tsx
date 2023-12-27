import { For } from "solid-js";
import { SnackBar } from ".";
import { useSnackbarStateContext } from "../../../context/snackbar";

export const SnackbarContainer = () => {
    const {
        store: { snackbars },
        actions: { removeToast },
    } = useSnackbarStateContext();

    return (
        <div class="fixed z-50 top-0 right-0 p-4 max-w-sm gap-2 flex flex-col  w-full">
            <For each={snackbars}>{(toast) => <SnackBar toast={toast} onClose={() => removeToast(toast.id!)} />}</For>
        </div>
    );
};
