import React from 'react';
import './taskCard.css';
import { IconButton } from '@mui/material';
import CustomTooltip from '../Tooltip/customTooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PriorityButton from './priorityButton';
import CustomInput from '../input/cutomInput';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function TaskCard({ id, task, onUpdate, onDelete, onComplete, isDragging }){

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };


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
            ref={setNodeRef} 
            style={style} 
        >
            <div className="task-card_priority-name" >
                <PriorityButton priority={task.priority} onPriorityChange={handlePriorityChange}/>
                <CustomInput
                value={task.name}
                onChange={handleNameChange}
                />
            </div>
            <div className="task-card_actions" >
                {task.status === 'done' 
                ? 
                ""
                : 
                <CustomTooltip title="Mark As Complete" placement="top" arrow>
                    <IconButton aria-label="complete" onClick={handleTaskComplete}>
                        <CheckCircleOutlineIcon />
                    </IconButton>
                </CustomTooltip>
                
                }
                <CustomTooltip title="Delete Task">
                    <IconButton aria-label="delete" onClick={handleTaskDelete}>
                            <DeleteIcon />
                    </IconButton>
                </CustomTooltip>
                <div 
                    {...listeners} 
                    {...attributes}
                >
                    <CustomTooltip title="Move Task">
                        <IconButton sx={{cursor:'move'}}>
                            <DragIndicatorIcon/>
                        </IconButton>
                    </CustomTooltip>
                </div>
                
               
            </div>
        </div>
    );
};