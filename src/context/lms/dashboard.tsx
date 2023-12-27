import { ParentComponent, Resource, Setter, createContext, createResource, onCleanup, onMount, useContext } from "solid-js";
import { UserCourse, UserClass, UserHomework } from "../../types/lms/types";
import { apiLMS } from "../../api/lms/api";
import { useSessionStateContext } from "../session";
import { debugMessage } from "../../utils/Debug";

type LMSContextType = {
    courses: {
        userCourses: Resource<UserCourse[] | null>;
        actions: {
            mutateUserCourses: () => Setter<UserCourse[]>;
            refetchUserCourses: () => UserCourse[] | Promise<UserCourse[] | undefined> | null | undefined;
        };
    };
    classes: {
        userClasses: Resource<UserClass[] | null>;
        actions: {
            mutateUserClasses: () => Setter<UserClass[]>;
            refetchUserClasses: () => UserClass[] | Promise<UserClass[] | undefined> | null | undefined;
        };
    };

    homeworks: {
        userHomeworks: Resource<UserHomework[] | null>;
        actions: {
            mutateUserHomeworks: () => Setter<UserHomework[]>;
            refetchUserHomeworks: () => UserHomework[] | Promise<UserHomework[] | undefined> | null | undefined;
        };
    };
};

const LMSStateContext = createContext<LMSContextType>();

export const LMSProvider: ParentComponent = (props) => {
    const { isAuthenticated } = useSessionStateContext();
    const [userCourses, { mutate: mutateUserCourses, refetch: refetchUserCourses }] = createResource<UserCourse[], boolean>(isAuthenticated, apiLMS.userCourses);
    const [userClasses, { mutate: mutateUserClasses, refetch: refetchUserClasses }] = createResource<UserClass[], boolean>(isAuthenticated, apiLMS.userClasses);
    const [userHomeworks, { mutate: mutateUserHomeworks, refetch: refetchUserHomeworks }] = createResource<UserHomework[], boolean>(isAuthenticated, apiLMS.userHomeworks);

    const courses = {
        userCourses,
        actions: {
            mutateUserCourses,
            refetchUserCourses,
        },
    };
    const classes = {
        userClasses,
        actions: {
            mutateUserClasses,
            refetchUserClasses,
        },
    };

    const homeworks = {
        userHomeworks,
        actions: {
            mutateUserHomeworks,
            refetchUserHomeworks,
        },
    };

    const value = {
        courses,
        classes,
        homeworks,
    };

    onMount(async () => {
        debugMessage("[onMount][Provider] LMS");
    });

    onCleanup(() => {
        debugMessage("[onCleanup][Provider] LMS");
    });

    return <LMSStateContext.Provider value={value}>{props.children}</LMSStateContext.Provider>;
};

export function useLMSStateContext() {
    return useContext(LMSStateContext)!;
}
