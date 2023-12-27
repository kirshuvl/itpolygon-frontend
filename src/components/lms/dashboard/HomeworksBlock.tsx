import { Component, For, Show } from "solid-js";
import { useLMSStateContext } from "../../../context/lms/dashboard";
import { ButtonRefresh } from "../../_shared/buttons/Button";
import { UserHomework } from "../../../types/lms/types";
import { A } from "@solidjs/router";

export const HomeworksBlock: Component = () => {
    const {
        homeworks: {
            userHomeworks,
            actions: { refetchUserHomeworks },
        },
    } = useLMSStateContext();

    return (
        <>
            <div class="flex justify-between pb-2 border-b items-center">
                <div class="text-2xl font-medium">Домашние задания</div>
                <ButtonRefresh onClick={refetchUserHomeworks} loading={userHomeworks.loading} />
            </div>
            <Show
                when={userHomeworks() && !userHomeworks.loading}
                fallback={
                    <>
                        <HomeworkCardSkeleton />
                        <HomeworkCardSkeleton />
                        <HomeworkCardSkeleton />
                    </>
                }
            >
                <Show when={userHomeworks()?.length != 0} fallback={<HomeworkCardEmpty />}>
                    <For each={userHomeworks()}>{(userHomework) => <HomeworkCard homework={userHomework} />}</For>
                </Show>
            </Show>
        </>
    );
};

type HomeworkCardType = {
    homework: UserHomework;
};

const HomeworkCard: Component<HomeworkCardType> = (props) => {
    const homework = props.homework;
    const dateTo = new Date(homework.dateTo);
    const formattedDate = dateTo.toLocaleDateString();

    return (
        <A href="" class="bg-white rounded-lg p-2 border hover:bg-slate-200">
            <div class="flex flex-row gap-2">
                <img class="w-14 h-14 rounded-lg" src={homework.course.icon} alt="" />
                <div class="w-full flex flex-col truncate justify-between py-1">
                    <div class="flex justify-between items-center">
                        <div class="truncate w-full">{homework.course.title}</div>
                    </div>
                    <div class="flex flex-row justify-between gap-2 items-center">
                        <div class="text-xs">{formattedDate}</div>
                        <div class="text-xs">ss</div>
                    </div>
                </div>
            </div>
        </A>
    );
};

const HomeworkCardSkeleton: Component = () => {
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
const HomeworkCardEmpty: Component = () => {
    return <div class="flex p-6  w-full bg-blue-400 rounded-lg text-2xl">Занятий нет</div>;
};
