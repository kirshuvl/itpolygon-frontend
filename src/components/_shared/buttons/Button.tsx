import { PlusSVG, RefreshSVGRotate, RefreshSVG } from "./icons";
import { Component, Show } from "solid-js";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    loading?: boolean;
    type?: "submit" | "danger" | "success";
}

export const Button: Component<ButtonProps> = (props) => {
    return (
        <button
            onClick={props.onClick}
            classList={{
                "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300": props.type == "submit",
                "bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300": props.type == "danger",
            }}
            class="w-full py-2 px-4 rounded-lg text-center text-white "
        >
            {props.text}
        </button>
    );
};

interface ButtonPlusProps {
    onClick?: () => void;
    loading?: boolean;
}

export const ButtonPlus: Component<ButtonPlusProps> = (props) => {
    return (
        <button onClick={props.onClick} class="text-xs border p-2 rounded-lg hover:bg-slate-200" disabled={props.loading}>
            <Show when={props.loading} fallback={<PlusSVG />}>
                <RefreshSVGRotate />
            </Show>
        </button>
    );
};

interface ButtonRefreshProps {
    onClick?: () => void;
    loading?: boolean;
}

export const ButtonRefresh: Component<ButtonRefreshProps> = (props) => {
    return (
        <button onClick={props.onClick} class="text-xs border p-2 rounded-lg hover:bg-slate-200" disabled={props.loading}>
            <Show when={props.loading} fallback={<RefreshSVG />}>
                <RefreshSVGRotate />
            </Show>
        </button>
    );
};
