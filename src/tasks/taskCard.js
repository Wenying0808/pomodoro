import React, { useState } from 'react';
import './taskCard.css';
import { colors } from '../colors/colors';
import { Input, Select, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useDrag } from 'react-dnd';

export default function TaskCard({ task, onUpdate, onDelete }){

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'task',
        item: { ...task },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));

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
        <div 
            className="task-card" 
            id={task.id}
            ref={dragRef}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                backgroundColor: colors.White,
            }}
        >
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
                {task.status === 'done' 
                ? 
                ""
                : 
                <IconButton aria-label="complete" onClick={handleTaskComplete}>
                    <CheckCircleOutlineIcon />
                </IconButton>
                }
                
                <IconButton aria-label="delete" onClick={handleTaskDelete}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
};