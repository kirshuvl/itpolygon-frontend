import { EditorBlock } from "../editor/types";

export interface Course {
    id: number;
    title: string;
    icon?: string;
}

export interface CourseEnroll {
    id: number;
    status: "PR" | "OK" | "ST";
    createDate: Date;
    updateDate: Date;
}

export interface UserCourse extends Course {
    courseEnroll: CourseEnroll;
}

export interface UserClass {
    id: number;
    course: Course;
    dateTo: Date;
    type: string;
}

export interface UserHomework {
    id: number;
    course: Course;
    dateTo: Date;
}

export interface CourseDetail extends Course {
    topics: Topic[];
}

export interface Topic {
    id: number;
    title: string;
    lessons: Lesson[];
}

export interface Lesson {
    id: number;
    title: string;
    closeDate: Date;
    openDate: Date;
}

export interface LessonDetail extends Lesson {
    steps: Step[];
}

export interface Step {
    id: number;
    title: string;
    type: "text" | "video" | "question" | "question_choice" | "problem" | "assignment";
    userStepEnroll: StepEnroll | null;
    object: TextStep;
}

export interface StepEnroll {
    id: number;
    createDate: Date;
    updateDate: Date;
    status: "PR" | "RP" | "WA" | "OK";
}

export interface TextStep {
    description: EditorBlock;
}
