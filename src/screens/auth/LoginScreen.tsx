import { Component, createEffect } from "solid-js";
import { TextInput } from "../../components/_shared/forms/input";
import { A } from "@solidjs/router";
import { Button } from "../../components/_shared/buttons/Button";
import { useSessionStateContext } from "../../context/session";

import { Navigate } from "@solidjs/router";

export const LoginScreen: Component = () => {
    const {
        isAuthenticated,
        actions: { signIn },
    } = useSessionStateContext();

    createEffect(() => {
        if (isAuthenticated()) {
            // TODO: Если пользователь - преподаватель, то перекидывать его в CMS.
            Navigate({ href: "/lms" });
        }
    });

    const btnClick = async () => {
        await signIn({ email: "kirshuvl@gmail.com", password: "admin" });
    };
    return (
        <>
            <div class="container mx-auto">
                <div class="flex items-center justify-center h-screen gap-4">
                    <div class="flex gap-4 flex-col w-full max-w-4-cols">
                        <div class=" bg-white rounded-lg shadow p-4 flex justify-center">
                            <A href="/" class="flex items-center">
                                <img src="/src/assets/logo.png" class="mr-3 h-6 sm:h-9 hover:grayscale" alt="itp" />
                                <div class="text-2xl font-semibold">ИТ Полигон</div>
                            </A>
                        </div>
                        <div class="flex flex-col gap-3 bg-white rounded-lg shadow p-4 ">
                            <div class="flex justify-between pb-2 border-b items-center">
                                <div class="text-2xl font-medium">Войти на сайт</div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <TextInput type="email" placeholder="Введите Email" autocomplete="email" />
                                <TextInput type="password" placeholder="Введите пароль" autocomplete="current-password" />
                                <A href="/reset" class="text-blue-500 hover:text-blue-700 text-right text-sm">
                                    Забыли пароль?
                                </A>
                                <Button onClick={btnClick} type="submit" text="Войти" />
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow p-4 text-center text-slate-500 text-sm">
                            Еще нет аккаунта?{" "}
                            <A href="/register" class="text-blue-500 hover:text-blue-700">
                                Зарегистрируйтесь
                            </A>
                        </div>
                        <div class="p-4 text-sm text-center text-slate-500">
                            Регистрируясь в сервисе, принимаю условия{" "}
                            <A href="" class="text-blue-500 hover:text-blue-700">
                                соглашения
                            </A>{" "}
                            и{" "}
                            <A href="" class="text-blue-500 hover:text-blue-700">
                                политики конфиденциальности
                            </A>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
