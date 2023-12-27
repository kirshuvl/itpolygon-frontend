import { Component } from "solid-js";
import { SnackbarContainer } from "./components/_shared/snackBar/container";
import { AppRoutes } from "./routers";

export const App: Component = () => {
    return (
        <>
            <SnackbarContainer />
            <AppRoutes />
        </>
    );
};
