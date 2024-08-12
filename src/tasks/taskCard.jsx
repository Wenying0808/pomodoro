import React from 'react';
import './taskCard.css';
import { colors } from '../colors/colors';
import { Input, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useDrag } from 'react-dnd';
import PriorityButton from './priorityButton';

export default function TaskCard({ task, onUpdate, onDelete, onComplete }){

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'task',
        item: { id: task.id, status: task.status, name: task.name, priority: task.priority }, 
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handlePriorityChange = (newPriority) => {
        onUpdate({ ...task, priority: newPriority });
    };
    const handleNameChange = (event) => {
        onUpdate({ ...task, name: event.target.value });
    };
    const handleTaskDelete = () => {
        onDelete(task.id)
    };
    const handleTaskComplete = () => {
        onComplete(task.id);
    };

    return (
        <div 
            className="task-card" 
            ref={dragRef}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                backgroundColor: colors.White,
            }}
        >
            <div className="task-card_priority-name" >
                <PriorityButton priority={task.priority} onPriorityChange={handlePriorityChange}/>
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
                <Tooltip title="Mark As Complete" placement="top" arrow>
                    <IconButton aria-label="complete" onClick={handleTaskComplete}>
                        <CheckCircleOutlineIcon />
                    </IconButton>
                </Tooltip>
                
                }
                <Tooltip title="Delete Task" placement="top" arrow>
                    <IconButton aria-label="delete" onClick={handleTaskDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
               
            </div>
        </div>
    );
};