import { InputBase, InputSelect, InputTextArea } from "./types";

export default function Input({ type = 'text', defaultValue = '', label, name, options, ...props }) {
    switch (type) {
        case 'textarea':
            return <InputTextArea label={label} name={name} defaultValue={defaultValue} {...props} />;
        case 'select':
            return <InputSelect label={label} name={name} defaultValue={defaultValue} options={options} {...props} />;
        default:
            return <InputBase label={label} name={name} defaultValue={defaultValue} {...props} />;
    }
}

