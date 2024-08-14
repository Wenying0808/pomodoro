import React from "react";
import "./section.css"
import { Chip } from "@mui/material";
import TaskCard from "./taskCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

export default function Section ({ id, title, tasks, taskIds, numberOfCards, onUpdate, onDelete, onComplete }) {

    const { setNodeRef } = useDroppable({
        id: `${id}-section`,
    });

    return(
        <div className="section" ref={setNodeRef}>
            <div className="section_header">
                <div className="section_header_title">
                    {title}
                </div>
                <Chip label={numberOfCards.toString()} size="small"/>
            </div>
            <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                <div className="section_tasks-list" >

                    {taskIds.map((taskId) => (
                        <TaskCard
                            key={taskId}
                            id={taskId}
                            task={tasks[taskId]}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            onComplete={onComplete}
                        />
                    ))}
                </div>
            </SortableContext>      
        </div>
    )
};