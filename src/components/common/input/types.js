export function InputBase({ label, type = 'text', name, defaultValue, className, ...props }) {
    return (
        <label className={`flex flex-col gap-1 bg-white rounded-lg ${className}`}>
            <span className="text-sm text-gray-500">{label}:</span>
            <input
                type={type}
                name={name}
                defaultValue={defaultValue}
                className="px-2 border-2 border-gray-200 rounded-lg peer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...props}
            />
        </label>
    );
}

export function InputTextArea({ label, name, defaultValue, className, ...props }) {
    return (
        <label className={`flex flex-col gap-1 ${className}`}>
            <span className="text-sm text-gray-700">{label}:</span>
            <textarea
                name={name}
                defaultValue={defaultValue}
                className="w-full p-1 border-2 border-gray-200 rounded-lg resize-none peer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...props}
            />
        </label>
    );
}

export function InputSelect({ label, name, options, defaultValue, className, ...props }) {
    return (
        <label className={`flex flex-col gap-1 ${className}`}>
            <span className="text-sm text-gray-700">{label}:</span>
            <select
                name={name}
                defaultValue={defaultValue}
                className="w-full px-2 py-1 border-2 border-gray-200 rounded-lg peer focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...props}
            >
                {options.map(({ label: optionLabel, value }, index) => (
                    <option key={index} value={value}>
                        {optionLabel}
                    </option>
                ))}
            </select>
        </label>
    );
}

