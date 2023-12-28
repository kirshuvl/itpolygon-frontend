import { Component, For, Show, createSignal } from "solid-js";
import { Topic } from "../../../types/lms/types";
import { ProgressBar } from "../../_shared/progressBar/progressBar";
import { LessonCard, LessonCardSkeleton } from "./lessonCard";

type TopicCardProps = {
    topic: Topic;
    number: number;
};

export const TopicCard: Component<TopicCardProps> = (props) => {
    const [isHide, setIsHide] = createSignal(false);
    const topic = props.topic;

    return (
        <>
            <div onClick={() => setIsHide(!isHide())} class="flex flex-row border p-2 gap-2 rounded-lg  hover:bg-slate-100 cursor-pointer bg-slate-50">
                <div class="flex flex-row grow justify-center items-center gap-2">
                    <div class="flex w-10 h-10  border rounded-lg justify-center bg-white items-center">{props.number}</div>
                    <div class="grow">{topic.title}</div>
                </div>
                <ProgressBar percent={50} />
            </div>
            <Show when={!isHide()}>
                <Show when={topic?.lessons && topic?.lessons.length != 0} fallback={<LessonCardSkeleton />}>
                    <For each={topic?.lessons}>{(lesson, index) => <LessonCard lesson={lesson} number={index()} />}</For>
                </Show>
            </Show>
        </>
    );
};

export const TopicCardSkeleton: Component = () => {
    return (
        <>
            <div class="flex flex-row border p-2 gap-2 rounded-lg hover:bg-slate-100 cursor-pointer bg-slate-50 animate-pulse ">
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
