import { Component, Show } from "solid-js";
import { A } from "@solidjs/router";
import { useSessionStateContext } from "../../../context/session";

export const Header: Component = () => {
    const {
        isAuthenticated,
        actions: { signOut },
    } = useSessionStateContext();
    return (
        <>
            <header class="bg-white rounded-lg shadow p-4">
                <div class="flex flex-wrap justify-between items-center ">
                    <A href="/" class="flex items-center">
                        <img src="/src/assets/logo.png" class="mr-3 h-6 sm:h-9" alt="itp" />
                        <div class="text-2xl font-semibold">ИТ Полигон</div>
                    </A>
                    <div class="flex items-center lg:order-2 gap-2">
                        <div class="p-2 border bg-slate-200 rounded-lg">{JSON.stringify(isAuthenticated())}</div>
                        <Show
                            when={isAuthenticated()}
                            fallback={
                                <A
                                    href="/login"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Login
                                </A>
                            }
                        >
                            <A
                                href="/cms"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                CMS
                            </A>
                            <A
                                href="/lms"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Dashboard
                            </A>
                            <A
                                onclick={signOut}
                                href="/"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Выйти
                            </A>
                        </Show>
                    </div>
                </div>
            </header>
        </>
    );
};
