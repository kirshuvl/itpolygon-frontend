import { Component, Show } from "solid-js";
import { Lesson } from "../../../types/lms/types";
import { A } from "@solidjs/router";
import { BlockIcon } from "../../_shared/buttons/icons";
import { ProgressBar } from "../../_shared/progressBar/progressBar";

type LessonCardProps = {
    lesson: Lesson;
    number: number;
};
export const LessonCard: Component<LessonCardProps> = (props) => {
    const curDate = new Date();
    const closeDate = new Date(props.lesson.closeDate);
    return (
        <>
            <A href={`/lms/lessons/${props.lesson.id}`} class="flex flex-row border p-2 gap-2 rounded-lg  hover:bg-slate-100 cursor-pointer bg-white ms-12">
                <div class="flex flex-row grow justify-center items-center gap-2">
                    <div class="flex w-10 h-10  border rounded-lg justify-center bg-white items-center">{props.number}</div>
                    <div class="grow">{props.lesson.title}</div>
                    <Show when={curDate > closeDate}>
                        <BlockIcon />
                    </Show>
                </div>
                <ProgressBar percent={50} />
            </A>
        </>
    );
};

export const LessonCardSkeleton: Component = () => {
    return (
        <>
            <div class="flex flex-row border p-2 gap-2 rounded-lg hover:bg-slate-100 cursor-pointer bg-slate-50 animate-pulse ms-12">
                <div class="flex flex-row w-full justify-center items-center gap-2">
                    <div class="flex w-10 h-10  border rounded-lg justify-center items-center bg-gray-200 "></div>
                    <div class="grow bg-gray-200 rounded-lg h-4 w-44"></div>
                    <div class="text-xs bg-gray-200 rounded-lg h-3 w-12"></div>
                </div>
                <ProgressBar percent={0} />
            </div>
        </>
    );
};
