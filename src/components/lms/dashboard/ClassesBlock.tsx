import { Component, For, Show } from "solid-js";
import { useLMSStateContext } from "../../../context/lms/dashboard";
import { ButtonRefresh } from "../../_shared/buttons/Button";
import { UserClass } from "../../../types/lms/types";
import { A } from "@solidjs/router";

export const ClassesBlock: Component = (props) => {
    const {
        classes: {
            userClasses,
            actions: { refetchUserClasses },
        },
    } = useLMSStateContext();

    return (
        <>
            <div class="flex justify-between pb-2 border-b items-center">
                <div class="text-2xl font-medium">Ближайшие занятия</div>
                <ButtonRefresh onClick={refetchUserClasses} loading={userClasses.loading} />
            </div>
            <Show
                when={userClasses() && !userClasses.loading}
                fallback={
                    <>
                        <ClassCardSkeleton />
                        <ClassCardSkeleton />
                        <ClassCardSkeleton />
                    </>
                }
            >
                <Show when={userClasses()?.length != 0} fallback={<ClassCardEmpty />}>
                    <For each={userClasses()}>{(userClass) => <ClassCard class={userClass} />}</For>
                </Show>
            </Show>
        </>
    );
};

type ClassCardType = {
    class: UserClass;
};

const ClassCard: Component<ClassCardType> = (props) => {
    const userClass = props.class;
    const dateTo = new Date(props.class.dateTo);
    const formattedDate = dateTo.toLocaleDateString();
    const formattedTime = dateTo.toLocaleTimeString();
    const parts = formattedTime.split(":"); // Разделяем строку по двоеточию

    const hours = parts[0]; // Получаем часы
    const minutes = parts[1]; // Получаем минуты
    return (
        <A href="" class="bg-white rounded-lg p-2 border hover:bg-slate-200">
            <div class="flex flex-row gap-2">
                <img class="w-14 h-14 rounded-lg" src={userClass.course.icon} alt="" />
                <div class="w-full flex flex-col truncate justify-between py-1">
                    <div class="flex justify-between items-center">
                        <div class="truncate w-full">{userClass.course.title}</div>
                    </div>
                    <div class="flex flex-row justify-between gap-2 items-center">
                        <div class="text-xs">
                            {formattedDate} {hours}:{minutes}
                        </div>
                        <div class="text-xs">{userClass.type}</div>
                    </div>
                </div>
            </div>
        </A>
    );
};

const ClassCardSkeleton: Component = () => {
    return (
        <div class="bg-white rounded-lg p-2 border hover:bg-slate-200 animate-pulse cursor-pointer">
            <div class="flex flex-row gap-2">
                <div class="aspect-square w-14 h-14 rounded-lg bg-slate-200" />
                <div class="w-full flex flex-col truncate justify-between py-1">
                    <div class="flex justify-between items-center">
                        <div class="truncate bg-gray-200 rounded-lg h-5 w-full"></div>
                    </div>
                    <div class="flex flex-row justify-between gap-2 items-center">
                        <div class="text-xs bg-gray-200 rounded-lg h-4 w-44"></div>
                        <div class="text-xs bg-gray-200 rounded-lg h-4 w-20"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const ClassCardEmpty: Component = () => {
    return <div class="flex p-6  w-full bg-blue-400 rounded-lg text-2xl">Занятий нет</div>;
};
