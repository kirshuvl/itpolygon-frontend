import { Component } from "solid-js";

type ProgressBarProps = {
    percent: number;
};

export const ProgressBar: Component<ProgressBarProps> = (props) => {
    return (
        <div class="flex w-2 bg-gray-200 rounded-lg items-end">
            <div class={`${props.percent === 100 ? "bg-green-500" : "bg-blue-500"} rounded-lg dark:bg-blue-500 w-full`} style={`height:${props.percent}%`}></div>
        </div>
    );
};
