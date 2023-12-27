import { Component } from "solid-js";

import { CoursesBlock } from "../../components/lms/dashboard/CoursesBlock";
import { ClassesBlock } from "../../components/lms/dashboard/ClassesBlock";
import { HomeworksBlock } from "../../components/lms/dashboard/HomeworksBlock";
export const LMSDashboard: Component = () => {
    return (
        <div class="grid grid-cols-3 gap-4">
            <div class="flex flex-col col-span-2 gap-4">
                <div class="flex flex-col gap-2 bg-white rounded-lg shadow p-4">
                    <div class="flex p-6  w-full bg-blue-400 rounded-lg">
                        <img src="https://education.maximumtest.ru/img/student_lies_with_book.39ad0578..svg" alt="" />
                    </div>
                </div>
                <div class="flex flex-col gap-2 bg-white rounded-lg shadow p-4">
                    <CoursesBlock />
                </div>
            </div>
            <div class="flex flex-col col-span-1 gap-4">
                <div class="flex flex-col gap-2 bg-white rounded-lg shadow p-4">
                    <ClassesBlock />
                </div>
                <div class="flex flex-col gap-2 bg-white rounded-lg shadow p-4">
                    <HomeworksBlock />
                </div>
            </div>
        </div>
    );
};
