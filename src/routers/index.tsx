import { Route, Routes } from "@solidjs/router";
import { MainLayout } from "./layouts/MainLayout";

import { AuthOutlet } from "../screens/auth/AuthOutlet";
import { HomeScreen } from "../screens/auth/HomeScreen";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { ResetPasswordScreen } from "../screens/auth/ResetPasswordScreen";

import { LMSOutlet } from "../screens/lms/outlet";
import { LMSDashboardScreen } from "../screens/lms/dashboad";
import { CourseDetailScreen } from "../screens/lms/courseDetail";
import { LessonOutlet } from "../screens/lms/outlet";
import { LessonDetail } from "../screens/lms/lessonDetail";

import { Error404 } from "../screens/errors/404";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" component={AuthOutlet}>
                <Route path="/login/" component={LoginScreen} />
                <Route path="/register/" component={RegisterScreen} />
                <Route path="/reset/" component={ResetPasswordScreen} />
            </Route>
            <Route path="/" component={MainLayout}>
                <Route path="/" component={AuthOutlet}>
                    <Route path="/" component={HomeScreen} />
                </Route>
                <Route path="/lms" component={LMSOutlet}>
                    <Route path="/" component={LMSDashboardScreen} />
                    <Route path="/courses/:id" component={CourseDetailScreen} />
                    <Route path="/lessons/:lessonId" component={LessonOutlet}>
                        <Route path="/" component={LessonDetail} />
                        <Route path="/steps/:stepId" component={LessonDetail} />
                    </Route>
                </Route>
            </Route>
            <Route path="*" component={Error404} />
        </Routes>
    );
};
