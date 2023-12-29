import { ParentComponent, createEffect } from "solid-js";
import { useSessionStateContext } from "../../context/session";
import { Navigate, Outlet } from "@solidjs/router";
import { LMSProvider } from "../../context/lms/dashboard";
import { LessonProvider } from "../../context/lms/lesson";

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

export const LessonOutlet: ParentComponent = () => {
    return (
        <LessonProvider>
            <Outlet />
        </LessonProvider>
    );
};
