import React, { useState } from 'react';
import './taskCard.css';
import { Input, Select, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function TaskCard({ task, onUpdate, onDelete }){

    const handlePriorityChange = (event) => {
        onUpdate({ ...task, priority: event.target.value });
    };
    const handleNameChange = (event) => {
        onUpdate({ ...task, name: event.target.value });
    };
    const handleTaskDelete = () => {
        onDelete(task.id)
    };
    const handleTaskComplete = () => {
        onUpdate({ ...task, status: 'done' });
    };

    return (
        <div className="task-card">
            <div className="task-card_priority-name" >
                <Select 
                    size="small"
                    value={task.priority}
                    onChange={handlePriorityChange}
                >
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                </Select>
                <Input
                    value={task.name}
                    onChange={handleNameChange}
                />
            </div>
            <div className="task-card_actions" >
                <IconButton aria-label="complete" onClick={handleTaskComplete}>
                    <CheckCircleOutlineIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleTaskDelete}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
};