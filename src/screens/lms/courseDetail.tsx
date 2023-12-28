import { useParams } from "@solidjs/router";
import { Component, For, Match, Show, Switch, createResource, createSignal } from "solid-js";
import { CourseDetail } from "../../types/lms/types";
import { apiLMS } from "../../api/lms/api";
import { ButtonRefresh } from "../../components/_shared/buttons/Button";
import { TopicCard, TopicCardSkeleton } from "../../components/lms/course/topicCard";
import { LessonCardSkeleton } from "../../components/lms/course/lessonCard";

export const CourseDetailScreen: Component = () => {
    const { id } = useParams<{ id: string }>();
    const [course, { mutate: mutateCourse, refetch: refetchCourse }] = createResource<CourseDetail, string>(id, apiLMS.getCourse);
    const [tab, setTab] = createSignal<string>("courses");

    return (
        <div class="grid grid-cols-3 gap-4">
            <div class="flex flex-col col-span-2 gap-4">
                <div class="flex flex-col gap-2 bg-white rounded-lg shadow p-4">
                    <div class="flex p-6  w-full bg-blue-400 rounded-lg">
                        <img src="https://education.maximumtest.ru/img/student_lies_with_book.39ad0578..svg" alt="" />
                    </div>
                </div>
                <div class="flex flex-col gap-2 bg-white rounded-lg shadow p-4">
                    <Switch>
                        <Match when={tab() === "courses"}>
                            <div class="flex justify-between pb-2 border-b items-center">
                                <div class="text-2xl font-medium">{course()?.title}</div>
                                <ButtonRefresh onClick={refetchCourse} loading={course.loading} />
                            </div>
                            <Show
                                when={!course.loading}
                                fallback={
                                    <>
                                        <TopicCardSkeleton />
                                        <LessonCardSkeleton />
                                        <LessonCardSkeleton />
                                        <LessonCardSkeleton />
                                        <TopicCardSkeleton />
                                        <LessonCardSkeleton />
                                        <LessonCardSkeleton />
                                        <TopicCardSkeleton />
                                        <LessonCardSkeleton />
                                    </>
                                }
                            >
                                <For each={course()?.topics}>{(topic, index) => <TopicCard topic={topic} number={index()} />}</For>
                            </Show>
                        </Match>
                    </Switch>
                </div>
            </div>
            <div class="flex flex-col col-span-1 gap-4">
                <Show when={course()?.icon}>
                    {" "}
                    <div class="flex flex-col gap-2 bg-white rounded-lg shadow p-4">
                        <img src={course()?.icon} alt="" class="rounded-lg" />
                    </div>
                </Show>
                <div class="flex flex-col gap-2 bg-white rounded-lg shadow p-4">ss</div>
                <div class="flex flex-col gap-2 bg-white rounded-lg shadow p-4">ss</div>
            </div>
        </div>
    );
};
