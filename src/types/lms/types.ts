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
