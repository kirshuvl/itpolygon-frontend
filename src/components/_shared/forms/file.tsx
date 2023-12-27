import { Field, FieldProps } from "solid-form-handler";
import { Component, JSX, Show, splitProps } from "solid-js";

export type FileInputProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "value"> &
    FieldProps & { label?: string } & ({ multiple?: false; value?: File } | { multiple?: true; value?: File[] });

export const FileInput: Component<FileInputProps> = (props) => {
    let fileInput: HTMLInputElement;
    const [local] = splitProps(props, ["classList", "label", "formHandler", "multiple", "value"]);

    return (
        <Field
            {...props}
            mode="file-input"
            render={(field) => (
                <div classList={local.classList}>
                    <Show when={local.label}>
                        <label class="form-label" for={field.props.id}>
                            {local.label}
                        </label>
                    </Show>
                    <input
                        ref={fileInput}
                        multiple={local.multiple}
                        type="file"
                        classList={{ "d-none": true }}
                        onChange={field.props.onChange}
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                    />
                    <button
                        onBlur={field.props.onBlur}
                        classList={{ "is-invalid": field.helpers.error }}
                        type="button"
                        class="form-control bg-light file-btn d-flex p-0 overflow-hidden"
                        onClick={() => fileInput?.click()}
                    >
                        
                    </button>
                    <Show when={field.helpers.error}>
                        <div class="invalid-feedback">{field.helpers.errorMessage}</div>
                    </Show>
                </div>
            )}
        />
    );
};
