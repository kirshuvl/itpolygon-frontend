import { Component, For, Match, Show, Switch } from "solid-js";
import { useLessonStateContext } from "../../../context/lms/lesson";
import { ButtonRefresh } from "../../_shared/buttons/Button";
import { AssignmentSVG, ProblemSVG, QuestionSVG, TextSVG, VideoSVG } from "../../_shared/buttons/icons";
import { A } from "@solidjs/router";
import { Step } from "../../../types/lms/types";
import { apiLMS } from "../../../api/lms/api";
import { debugDelay } from "../../../utils/Debug";

export const StepsBlock: Component = () => {
    const {
        lesson, currentStep,
        actions: { refetchLesson },
    } = useLessonStateContext();

    return (
        <>
            <div class="flex justify-between pb-2 border-b items-center">
                <div class="text-2xl font-medium">Шаги урока | {JSON.stringify(currentStep()?.title)}</div>
                <ButtonRefresh onClick={refetchLesson} loading={lesson.loading} />
            </div>

            <Show
                when={lesson() && !lesson.loading}
                fallback={
                    <>
                        <StepCardSkeleton />
                        <StepCardSkeleton />
                        <StepCardSkeleton />
                    </>
                }
            >
                <Show when={lesson()?.steps.length != 0} fallback={<StepCardEmpty />}>
                    <For each={lesson()?.steps}>{(step, index) => <StepCard step={step} number={index() + 1} />}</For>
                </Show>
            </Show>
        </>
    );
};

type StepCardType = {
    step: Step;
    number: number;
};

const StepCard: Component<StepCardType> = (props) => {
    const step = props.step;

    const {
        lesson,
        currentStep,
        setCurrentStep,
        actions: { mutateLesson },
    } = useLessonStateContext();

    const btnClick = async () => {
        setCurrentStep(step);
        
    };

    return (
        <>
            <A
                onClick={btnClick}
                href={`/lms/lessons/${lesson().id}/steps/${step.id}`}
                class={`rounded-lg p-2 border ${step.id == currentStep()?.id ? "bg-blue-100 hover:bg-blue-200" : "bg-white hover:bg-slate-200"} `}
            >
                <div class="flex flex-row gap-2">
                    <div
                        classList={{
                            "bg-slate-200": step.userStepEnroll == null,
                            "bg-blue-200": step.userStepEnroll?.status == "PR",
                            "bg-red-200": step.userStepEnroll?.status == "WA",
                            "bg-green-200": step.userStepEnroll?.status == "OK",
                        }}
                        class="flex w-14 h-14 rounded-lg justify-center items-center aspect-square"
                    >
                        <Switch>
                            <Match when={step.type == "text"}>
                                <TextSVG />
                            </Match>
                            <Match when={step.type == "video"}>
                                <VideoSVG />
                            </Match>
                            <Match when={step.type == "question"}>
                                <QuestionSVG />
                            </Match>
                            <Match when={step.type == "question_choice"}>
                                <QuestionSVG />
                            </Match>
                            <Match when={step.type == "problem"}>
                                <ProblemSVG />
                            </Match>
                            <Match when={step.type == "assignment"}>
                                <AssignmentSVG />
                            </Match>
                        </Switch>
                    </div>
                    <div class="w-full flex flex-col truncate justify-between py-1">
                        <div class="flex justify-between items-center">
                            <div class="truncate w-full">{step.title}</div>
                        </div>
                        <div class="flex flex-row justify-between gap-2 items-center">
                            <div class="text-xs">{step.type}</div>
                        </div>
                    </div>
                </div>
            </A>
        </>
    );
};

const StepCardSkeleton: Component = () => {
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
                    </div>
                </div>
            </div>
        </div>
    );
};

const StepCardEmpty: Component = () => {
    return <div class="flex p-6  w-full bg-blue-400 rounded-lg text-2xl">А шагов то и нет!</div>;
};
