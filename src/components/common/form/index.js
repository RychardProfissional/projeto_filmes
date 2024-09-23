import * as Yup from 'yup';
import Input from "../input";
import Modal from "../modal";
import { useState } from 'react';

export default function Form({
    title,
    inputs,
    onSubmit,
    submitText = 'Salvar',
    isModal = false,
    open = false,
    onClose = () => {},
}) {
    const [errors, setErrors] = useState({});

    const schema = getSchema(inputs);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {};
        for (const entry of formData.entries()) {
            obj[entry[0]] = entry[1];
        }

        console.log(obj)
        
        try {
            await schema.validate(obj, { abortEarly: false });
            setErrors({});
            onSubmit && onSubmit(obj);
            onClose();
        } catch (e) {
            setErrors(
                e.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {})
            );
        }
    };
    
    return isModal ? (
        <Modal isOpen={open} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-4 rounded-md w-[60vw]">
                <h1 className="mb-4 text-2xl font-bold">{title}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                    {inputs.map((input, i) => (
                        <Input
                            key={`input-${i}`}
                            {...input}
                            error={errors[input.name]}
                        />
                    ))}
                </div>
                <button
                    className="w-full p-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    type="submit"
                >
                    {submitText}
                </button>
            </form>
        </Modal>
    ) : (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md shadow-lg">
            <h1 className="mb-4 text-2xl font-bold">{title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                {inputs.map((input, i) => (
                    <Input
                        key={`input-${i}`}
                        {...input}
                        error={errors[input.name]}
                    />
                ))}
            </div>
            <button
                className="w-full p-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                type="submit"
            >
                {submitText}
            </button>
        </form>
    );
}

const getSchema = (inputs) => {
    return Yup.object().shape(
        inputs.reduce((acc, curr) => {
            acc[curr.name] = curr.validation;
            return acc;
        }, {})
    );
};
