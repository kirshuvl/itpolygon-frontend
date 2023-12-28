import { axiosPrivate } from "../api";
import { UserCourse, UserClass, UserHomework, CourseDetail } from "../../types/lms/types";
import { useNavigate } from "@solidjs/router";

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
        const navigate = useNavigate();
        try {
            const response = await axiosPrivate.get(`/lms/api/v1/courses/${id}/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};
