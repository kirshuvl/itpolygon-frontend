import { Component, Show } from "solid-js";
import { Outlet } from "@solidjs/router";
import { Header } from "../../components/_shared/main/Header";
import { Footer } from "../../components/_shared/main/Footer";
import { Loader } from "../../utils/Loader";
import { useSessionStateContext } from "../../context/session";

export const MainLayout: Component = () => {
    const { isSessionLoaded } = useSessionStateContext();

    return (
        <div class="flex flex-col h-screen justify-between">
            <div class="container mx-auto mt-2 mb-4">
                <Header />
            </div>
            <Show when={isSessionLoaded()} fallback={<Loader />}>
                <div class="container mb-auto">
                    <Outlet />
                </div>
            </Show>
            <div class="container mx-auto mt-4 mb-2">
                <Footer />
            </div>
        </div>
    );
};
