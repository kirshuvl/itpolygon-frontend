import { ParentComponent, createEffect } from "solid-js";
import { useSessionStateContext } from "../../context/session";
import { Navigate, Outlet } from "@solidjs/router";

export const AuthOutlet: ParentComponent = () => {
    const { isAuthenticated } = useSessionStateContext();
    
    createEffect(() => {
        if (isAuthenticated()) {
            // TODO: Если пользователь - преподаватель, то перекидывать его в CMS.
            Navigate({ href: "/lms" });
        }
    });
    return <Outlet />;
};
