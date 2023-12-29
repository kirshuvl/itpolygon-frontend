import { Accessor, ParentComponent, Resource, Setter, createContext, createEffect, createResource, createSignal, on, onMount, useContext } from "solid-js";
import { LessonDetail, Step } from "../../types/lms/types";
import { useParams } from "@solidjs/router";
import { apiLMS } from "../../api/lms/api";
import { debugDelay } from "../../utils/Debug";

type LessonStateContextType = {
    lesson: Resource<LessonDetail>;
    currentStep: Accessor<Step>;
    setCurrentStep: Setter<Step>;
    actions: {
        mutateLesson: Setter<LessonDetail>;
        refetchLesson: () => LessonDetail | Promise<LessonDetail | undefined> | null | undefined;
    };
};

const LessonStateContext = createContext<LessonStateContextType>();

export const LessonProvider: ParentComponent = (props) => {
    const { lessonId, stepId } = useParams<{ lessonId: string; stepId: string }>();
    const [lesson, { mutate: mutateLesson, refetch: refetchLesson }] = createResource<LessonDetail, string>(lessonId, apiLMS.getLesson);

    const [currentStep, setCurrentStep] = createSignal<Step>();

    createEffect(
        on(
            () => lesson.loading,
            () => {
                if (!stepId && !lesson.loading) {
                    setCurrentStep(findFirstStep());
                } else {
                    const stepWithoutStatus = lesson()?.steps.find((step) => step.id == parseInt(stepId));
                    setCurrentStep(stepWithoutStatus);
                }
            }
        ),
        { defer: true }
    );

    createEffect(
        on(currentStep, async () => {
            const step = currentStep();
            if (step.userStepEnroll == null) {
                const data = await apiLMS.postStepEnroll(step.id.toString());
                debugDelay();
                const allSteps = lesson().steps;

                //const newSteps = allSteps.map(obj => {obj.id == step.id ? {...step, userStepEnroll: data} : obj})
                const newSteps = allSteps.map((obj) => (obj.id === step.id ? { ...step, userStepEnroll: data } : obj));

                const newLesson = { ...lesson(), steps: newSteps };
                mutateLesson(() => newLesson);
            }
        })
    );
    /*
    onMount(() => {
        console.log(stepId, !lesson.loading)
        if (!stepId && !lesson.loading) {
            setCurrentStep(findFirstStep());
        } else {
            const stepWithoutStatus = lesson()?.steps.find((step) => step.id == parseInt(stepId));
            setCurrentStep(stepWithoutStatus);
        }
    })*/

    const findFirstStep = () => {
        const stepWithoutStatus = lesson().steps.find((step) => step.userStepEnroll?.status != "OK");
        return stepWithoutStatus;
    };

    const actions = {
        mutateLesson,
        refetchLesson,
    };
    const value = {
        lesson,
        currentStep,
        setCurrentStep,
        actions,
    };
    return <LessonStateContext.Provider value={value}>{props.children}</LessonStateContext.Provider>;
};

export function useLessonStateContext() {
    return useContext(LessonStateContext)!;
}
