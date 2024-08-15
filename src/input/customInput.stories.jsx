import CustomInput from "./cutomInput";

export default {
    title: "Input",
    component: CustomInput,
    parameters: {
        layout: 'centered',  
    },
    argTypes: {
        placeholder: { control: 'text' },
        value: { control: 'text' },
    },
};

export const WithPlaceholder = {
    args: {
        placeholder: "Enter your task...",
    },
};

export const WithText = {
    args: {
        value: "My Task",
    },
};