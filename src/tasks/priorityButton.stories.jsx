import React, { useState } from 'react';
import PriorityButton from "./priorityButton";

export default {
    title: 'Components/Priority Button',
    component: PriorityButton,
    parameters: {
        layout: 'centered',  
    },
};


export const Default = () => {
    const [priority, setPriority] = useState('low');

    const handleChange = (newpriority) => {
        if (newpriority !== null) {
            setPriority(newpriority);
        }
    };

    return (
        <PriorityButton
            priority={priority}
            onPriorityChange={handleChange}
        />
    );
};