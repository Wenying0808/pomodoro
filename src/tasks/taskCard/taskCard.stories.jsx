import React, { useState } from 'react';
import TaskCard from "./taskCard";


export default {
    title: 'Components/Task Card',
    component: TaskCard,
    parameters: {
        layout: 'centered',  
    },
};

export const ToDo = () => {
    const [task, setTask] = useState({
        id: '1',
        name: 'My Task',
        priority: 'low',
        status: 'todo',
    });

    const handleUpdate = (updatedTask) => {
        setTask(updatedTask);
    };

    const handleDelete = (taskId) => {
        console.log(`Task with id ${taskId} deleted`);
    };

    const handleComplete = (taskId) => {
        console.log(`Task with id ${taskId} marked as complete`);
        setTask({ ...task, status: 'done' });
    };

    return (
        <TaskCard
            id={task.id}
            task={task}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onComplete={handleComplete}
        />
    );
};

export const Done = () => {
    const [task, setTask] = useState({
        id: '1',
        name: 'My task is done',
        priority: 'high',
        status: 'done',
    });

    const handleUpdate = (updatedTask) => {
        setTask(updatedTask);
    };

    const handleDelete = (taskId) => {
        console.log(`Task with id ${taskId} deleted`);
    };

    const handleComplete = (taskId) => {
        console.log(`Task with id ${taskId} marked as complete`);
        setTask({ ...task, status: 'done' });
    };

    return (
        <TaskCard
            id={task.id}
            task={task}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onComplete={handleComplete}
        />
    );
};