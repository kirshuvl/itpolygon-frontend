import { Component, Show, createEffect, createSignal } from "solid-js";
import { TextInput } from "../../components/_shared/forms/input";
import { A } from "@solidjs/router";
import { Button } from "../../components/_shared/buttons/Button";


import { useSessionStateContext } from "../../context/session";

import { Navigate } from "@solidjs/router";

export const ResetPasswordScreen: Component = () => {

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
    
    const [timer, setTimer] = createSignal<number>(0);
    const [isSending, setIsSending] = createSignal<boolean>(false);

    const buttonClick = () => {
        setTimer(60);
        setIsSending(true);
        let timerId;
        const increasePercent = () => {
            timerId = setTimeout(() => {
                if (timer() == 0) {
                    setIsSending(false);
                    return;
                }
                setTimer((old) => old - 1);
                increasePercent();
            }, 10);
        };
        increasePercent();
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
                                <div class="text-2xl font-medium">Восстановить пароль</div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <Show when={!isSending()} fallback={<div class="bg-slate-100 p-3 rounded-lg border">Выслали на почту письмо</div>}>
                                    <TextInput type="email" placeholder="Введите Email" />
                                </Show>

                                <Button type="submit" onClick={buttonClick} text={timer() == 0 ? "Отправить" : "Переотправить"} />
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow p-4 text-center text-slate-500 text-sm">
                            Вспомнили пароль?{" "}
                            <A href="/login" class="text-blue-500 hover:text-blue-700">
                                Войдите
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

/*
<div class="flex items-center justify-center h-screen bg-slate-200">
                    <div class="grid grid-cols-3 gap-4 bg-green-200 w-full">
                        <div class="bg-red-400  col-start-2">login page</div>
                    </div>
                </div>

<div class="container mx-auto bg-red-400">
                <div class="flex items-center justify-center h-screen bg-green-200">
                    <div class="block border bg-white p-4 max-w-3-cols w-full rounded-lg">
                        <TextInput placeholder="Введите Email"/>
                        <TextInput placeholder="Введите пароль"/>
                    </div>
                </div>
            </div>

*/
