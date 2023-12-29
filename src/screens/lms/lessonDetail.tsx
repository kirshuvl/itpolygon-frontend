import { Component, For, Match, Show, Switch, onMount } from "solid-js";
import { useLessonStateContext } from "../../context/lms/lesson";
import { StepsBlock } from "../../components/lms/dashboard/StepsBlock";
import { EditorImageBlock, EditorTextBlock } from "../../types/editor/types";
import { apiLMS } from "../../api/lms/api";
import { debugDelay } from "../../utils/Debug";

export const LessonDetail: Component = () => {
    const { currentStep } = useLessonStateContext();
    return (
        <div class="grid grid-cols-3 gap-4">
            <div class="flex flex-col col-span-2 gap-4">
                <div class="flex flex-col gap-2 bg-white rounded-lg shadow p-4">
                    <div class="flex p-6  w-full bg-blue-400 rounded-lg">
                        <img src="https://education.maximumtest.ru/img/student_lies_with_book.39ad0578..svg" alt="" />
                    </div>
                </div>
                <div class="flex flex-col gap-2 bg-white rounded-lg shadow p-4">
                    <Show when={currentStep()} fallback={<div>ГРУЗИМ ШАГ</div>}>
                        <CurrentStep />
                    </Show>
                </div>
            </div>
            <div class="flex flex-col col-span-1 gap-4 ">
                <div class="sticky top-4 gap-4 flex flex-col">
                    <div class="flex flex-col gap-2 bg-white rounded-lg shadow p-4">
                        <StepsBlock />
                    </div>
                </div>
            </div>
        </div>
    );
};

const CurrentStep: Component = () => {
    const {
        lesson,
        currentStep,
        actions: { mutateLesson },
    } = useLessonStateContext();
    const step = currentStep();

    onMount(async () => {
        console.log("Смонтировали шаг", currentStep().id);
    });
    return (
        <>
            <For each={currentStep()?.object.description.blocks}>
                {(block) => (
                    <Switch>
                        <Match when={block.type == "paragraph"}>
                            <div class="p-2 hover:bg-slate-50">{(block as EditorTextBlock).data.text}</div>
                        </Match>
                        <Match when={block.type == "image"}>
                            <img src={(block as EditorImageBlock).data.file.url} alt="" class="w-full rounded-lg" />
                        </Match>
                    </Switch>
                )}
            </For>
        </>
    );
};
