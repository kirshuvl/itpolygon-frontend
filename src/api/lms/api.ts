import { axiosPrivate } from "../api";
import { UserCourse, UserClass, UserHomework, CourseDetail, LessonDetail, StepEnroll } from "../../types/lms/types";

export const apiLMS = {
    userCourses: async (): Promise<UserCourse[]> => {
        try {
            const response = await axiosPrivate.get("/lms/api/v1/courses/");

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    userClasses: async (): Promise<UserClass[]> => {
        try {
            const response = await axiosPrivate.get("/lms/api/v1/classes/");

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    userHomeworks: async (): Promise<UserHomework[]> => {
        try {
            const response = await axiosPrivate.get("/lms/api/v1/homeworks/");

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getCourse: async (id: string): Promise<CourseDetail> => {
        try {
            const response = await axiosPrivate.get(`/lms/api/v1/courses/${id}/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getLesson: async (id: string): Promise<LessonDetail> => {
        try {
            const response = await axiosPrivate.get(`/lms/api/v1/lessons/${id}/`);

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    postStepEnroll: async (id: string): Promise<StepEnroll> => {
        try {
            const localData = new FormData();
            localData.append("step", id);
            const response = await axiosPrivate.post("lms/api/v1/steps/enroll/", localData);

            return response.data;
        } catch (error) {
            throw error;
        }
    },
};
