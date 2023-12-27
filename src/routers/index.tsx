import { Route, Routes } from "@solidjs/router";
import { MainLayout } from "./layouts/MainLayout";

import { AuthOutlet } from "../screens/auth/AuthOutlet";
import { HomeScreen } from "../screens/auth/HomeScreen";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { ResetPasswordScreen } from "../screens/auth/ResetPasswordScreen";

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
            </Route>
            <Route path="*" component={Error404} />
        </Routes>
    );
};

/*
<Route path="/lms" component={LMSOutlet}>
<Route path="/" component={LMSDashboard} />
<Route path="/courses/:id" component={CourseDetailScreen} />
<Route path="/lessons/:id" component={LessonOutlet}>
<Route path="/" component={LessonDetail} />
</Route>
</Route>
*/
