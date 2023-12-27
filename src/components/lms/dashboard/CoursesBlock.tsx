import { Component, For, Show } from "solid-js";
import { useLMSStateContext } from "../../../context/lms/dashboard";
import { ButtonRefresh } from "../../_shared/buttons/Button";
import { UserCourse } from "../../../types/lms/types";
import { A } from "@solidjs/router";
import { ProgressBar } from "../../_shared/progressBar/progressBar";

export const CoursesBlock: Component = () => {
    const {
        courses: {
            userCourses,
            actions: { refetchUserCourses },
        },
    } = useLMSStateContext();

    return (
        <>
            <div class="flex justify-between pb-2 border-b items-center">
                <div class="text-2xl font-medium">Мои курсы</div>
                <ButtonRefresh onClick={refetchUserCourses} loading={userCourses.loading} />
            </div>
            <Show
                when={userCourses() && !userCourses.loading}
                fallback={
                    <>
                        <CourseCardSkeleton />
                        <CourseCardSkeleton />
                        <CourseCardSkeleton />
                    </>
                }
            >
                <Show
                    when={userCourses()?.length != 0}
                    fallback={
                        <>
                            <CourseCardEmpty />
                        </>
                    }
                >
                    <For each={userCourses()}>{(course) => <CourseCard course={course} />}</For>
                </Show>
            </Show>
        </>
    );
};

type CourseCardType = {
    course: UserCourse;
};

const CourseCard: Component<CourseCardType> = (props) => {
    const course = props.course;

    return (
        <A
            href={course.courseEnroll.status != "ST" ? `/lms/courses/${course.id}` : ""}
            class={`bg-white rounded-lg p-2 border  ${course.courseEnroll.status == "ST" ? "hover:blur" : "hover:bg-slate-200"}`}
        >
            <div class="flex flex-row gap-4">
                <Show when={course.icon} fallback={<div class=" flex w-28 h-28 aspect-square bg-slate-100 rounded-lg justify-center items-center text-6xl">{course.title[0]}</div>}>
                    <img class="w-28 h-28 rounded-lg" src={course.icon} alt="" />
                </Show>
                <div class="w-full flex flex-row gap-4 justify-between items-center">
                    <div class="w-full flex flex-col gap-4">
                        <div class="text-2xl font-medium ">{course.title}</div>
                    </div>
                </div>
                <ProgressBar percent={50} />
            </div>
        </A>
    );
};

const CourseCardSkeleton: Component = () => {
    return (
        <div class="bg-white rounded-lg p-2 border hover:bg-slate-100 animate-pulse cursor-pointer">
            <div class="flex flex-row gap-4 ">
                <div class="aspect-square w-28 h-28 rounded-lg bg-slate-200" />
                <div class="w-full flex flex-row gap-4 justify-between items-center">
                    <div class="w-full flex flex-col gap-4 ">
                        <div class="text-2xl font-medium bg-gray-200 rounded-lg h-6 w-72"></div>
                        <div class="flex flex-row gap-4">
                            <div class="bg-gray-200 rounded-lg h-5 w-44"></div>
                            <div class="bg-gray-200 rounded-lg h-5 w-44"></div>
                        </div>
                    </div>
                </div>
                <ProgressBar percent={0} />
            </div>
        </div>
    );
};

const CourseCardEmpty: Component = () => {
    return <div class="flex p-6  w-full bg-blue-400 rounded-lg text-2xl">Курсов нет</div>;
};
