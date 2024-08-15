import React, { useState } from 'react';
import CustomToggleButton from "./toggleButton";

export default {
    title: 'Components/Toggle Button',
    component: CustomToggleButton,
};

export const Default = () => {
    const [selectedValue, setSelectedValue] = useState('timer');

    const handleChange = (event, newValue) => {
        if (newValue !== null) {
            setSelectedValue(newValue);
        }
    };

    return (
        <CustomToggleButton
            value={selectedValue}
            onChange={handleChange}
        />
    );
};