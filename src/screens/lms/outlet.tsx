import { ParentComponent, createEffect } from "solid-js";
import { useSessionStateContext } from "../../context/session";
import { Navigate, Outlet } from "@solidjs/router";
import { LMSProvider } from "../../context/lms/dashboard";

export const LMSOutlet: ParentComponent = () => {
    const { isAuthenticated } = useSessionStateContext();

    createEffect(() => {
        if (!isAuthenticated()) {
            Navigate({ href: "/login" });
        }
    });

    return (
        <LMSProvider>
            <Outlet />
        </LMSProvider>
    );
};
