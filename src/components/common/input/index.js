import { INPUT } from "@/lib/constants/forms";
import { InputBase, InputDate, InputMultiSelect, InputNumber, InputSelect, InputTextArea } from "./types";

export default function Input({ type = 'text', defaultValue = '', label, name, error, options, ...props }) {
    switch (type) {
        case INPUT.TEXTAREA:
            return <InputTextArea label={label} name={name} defaultValue={defaultValue} error={error} {...props} />;
        case INPUT.SELECT:
            return <InputSelect label={label} name={name} defaultValue={defaultValue} options={options} error={error} {...props} />;
        case INPUT.MULTISELECT:
            return <InputMultiSelect label={label} name={name} defaultValue={defaultValue} options={options} error={error} {...props} />;
        case INPUT.DATE:
            return <InputDate label={label} name={name} defaultValue={defaultValue} error={error} {...props} />;
        case INPUT.NUMBER:
            return <InputNumber label={label} name={name} defaultValue={defaultValue} error={error} {...props} />;
        default:
            return <InputBase label={label} name={name} defaultValue={defaultValue} error={error} {...props} />;
    }
}

