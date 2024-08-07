import React, {useState, useEffect} from 'react';
import './tasks.css';
import { colors } from '../colors/colors';
import { v4 as uuidv4 } from 'uuid';
import TaskCard from './taskCard';
import { Input, Select, MenuItem, IconButton, Chip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Tasks({ user, isLoggeIn, tasks, setTasks }) {

    const [newTaskPriority, setNewTaskPriority] = useState('low');
    const [newTaskName, setNewTaskName] = useState('');
    const [numberOfTodoTask, setnumberOfTodoTask] = useState(0);
    const [numberOfProgressTask, setnumberOfProgressTask] = useState(0);
    const [numberOfDoneTask, setnumberOfDoneTask] = useState(0);

    const handlePriorityChange = (event) => {
        setNewTaskPriority(event.target.value);
    };
    const handleNmaeChange = (event) => {
        setNewTaskName(event.target.value);
    };

    const addTask = () => {
        const newTaskId = uuidv4();
        const newTask = {
            id: newTaskId ,
            name: newTaskName,
            priority: newTaskPriority,
            status: 'todo'
        }
        setTasks({ ...tasks, [newTaskId]: newTask })
        setNewTaskName('');
        setNewTaskPriority('low');
    };

    const updateTask = (updatedTask) => {
        setTasks({ ...tasks, [updatedTask.id]: updatedTask})
    };

    const deleteTask = (taskId) => {
        const updatedTasks = {...tasks};
        delete updatedTasks[taskId];
        setTasks(updatedTasks);
    };

    return(
        <div className="container">
            <div className="add-task">
                <div className="add-task_priority-name" >
                    <Select 
                        size="small"
                        value={newTaskPriority}
                        onChange={handlePriorityChange}
                    >
                        <MenuItem value="high">High</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                    </Select>
                    <Input
                        placeholder="Create a task..."
                        value={newTaskName}
                        onChange={handleNmaeChange}
                    />
                </div>
                <IconButton onClick={addTask} disabled={newTaskName===''}>
                    <AddCircleIcon/>
                </IconButton>
            </div>
            <div className="sections">
                <div className="section todo-section">
                    <div className="section_header">
                        <div>
                            Todo
                        </div>
                        <Chip label={numberOfTodoTask.toString()} size="small"/>
                    </div>
                    
                    <div className="section_tasks-list">
                        {Object.values(tasks)
                            .filter((tasks) => tasks.status === 'todo')
                            .map(task => (
                                <TaskCard 
                                    key={task.id}
                                    task={task}
                                    onUpdate={updateTask}
                                    onDelete={deleteTask}
                                />
                            ))
                        } 
                    </div>                    
                </div>
                <div className="section inProgress-section">
                <div className="section_header">
                        <div>
                            In Progress
                        </div>
                        <Chip label={numberOfProgressTask.toString()} size="small"/>
                    </div>
                    
                    <div className="section_tasks-list">
                        {Object.values(tasks)
                            .filter((tasks) => tasks.status === 'in progress')
                            .map(task => (
                                <TaskCard 
                                    key={task.id}
                                    task={task}
                                    onUpdate={updateTask}
                                    onDelete={deleteTask}
                                />
                            ))
                        } 
                    </div>               
                </div>
                <div className="section done-section">
                    <div className="section_header">
                        <div>
                            Done
                        </div>
                        <Chip label={numberOfDoneTask.toString()} size="small"/>
                    </div>
                    <div className="section_tasks-list">
                        {Object.values(tasks)
                            .filter((tasks) => tasks.status === 'done')
                            .map(task => (
                                <TaskCard 
                                    key={task.id}
                                    task={task}
                                    onUpdate={updateTask}
                                    onDelete={deleteTask}
                                />
                            ))
                        } 
                    </div>                    
                </div>
            </div>
        </div>
    )
};