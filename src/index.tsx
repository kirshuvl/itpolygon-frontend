import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { App } from "./App";

import { SnackbarProvider } from "./context/snackbar";
import { SessionProvider } from "./context/session";

import "./index.css";

const root = document.getElementById("root");
render(
    () => (
        <Router>
            <SnackbarProvider>
                <SessionProvider>
                    <App />
                </SessionProvider>
            </SnackbarProvider>
        </Router>
    ),
    root!
);
