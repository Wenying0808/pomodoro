import React, {useState, useEffect} from 'react';
import './tasks.css';
import { colors } from '../colors/colors';
import { v4 as uuidv4 } from 'uuid';
import TaskCard from './taskCard';
import PriorityButton from './priorityButton';
import { Input, IconButton, Chip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDrop } from 'react-dnd';

export default function Tasks({ user, isLoggeIn, tasks, setTasks }) {

    const [newTaskPriority, setNewTaskPriority] = useState('low');
    const [newTaskName, setNewTaskName] = useState('');

    const [todoOrder, setTodoOrder] = useState([]);
    const [inProgressOrder, setInProgressOrder] = useState([]);
    const [doneOrder, setDoneOrder] = useState([]);

    const [numberOfTodoTask, setnumberOfTodoTask] = useState(0);
    const [numberOfProgressTask, setnumberOfProgressTask] = useState(0);
    const [numberOfDoneTask, setnumberOfDoneTask] = useState(0);

    useEffect(() => {
        setnumberOfTodoTask(todoOrder.length);
        setnumberOfProgressTask(inProgressOrder.length);
        setnumberOfDoneTask(doneOrder.length);
    }, [todoOrder, inProgressOrder, doneOrder]);

    const handlePriorityChange = (newPriority) => {
        setNewTaskPriority(newPriority);
    };
    const handleNameChange = (event) => {
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
        setTodoOrder((prevOrder) => [newTaskId, ...prevOrder]); // Add to todoOrder
    };

    const updateTask = (updatedTask) => {
        setTasks((prevTasks) => ({ ...prevTasks, [updatedTask.id]: updatedTask }));
    };

    const completeTask = (taskId) => {
        const task = tasks[taskId];
        const updatedTask = {...task, status: "done"};
        setTasks({ ...tasks, [taskId]: updatedTask });

        if (task.status === "todo"){
            setTodoOrder(prevOrder => prevOrder.filter(id => id !== taskId));
        } else if (task.status === "inProgress"){
            setInProgressOrder(prevOrder => prevOrder.filter(id => id !== taskId));
        }

        setDoneOrder(prevOrder => [taskId, ...prevOrder]);
    };
   

    const reorderTasks = (sourceId, destinationId, sourceList, setSourceList) => {
        const newOrder = [...sourceList];
        const sourceIndex = newOrder.indexOf(sourceId);
        const destinationIndex = newOrder.indexOf(destinationId);
        // remove from sourceIndex
        newOrder.splice(sourceIndex, 1);
        // insert it into destinationIndex
        newOrder.splice(destinationIndex, 0, sourceId);
        setSourceList(newOrder);
    };

    const [, dropTodo] = useDrop(() => ({
        accept: 'task',
        drop: (item, monitor) => {
            const sourceId = item.id;
            const destinationId = monitor.getItem().id;
            // move from other sections to todo Section
            if (item.status !== "todo"){
                updateTask({ ...tasks[item.id], status: 'todo' });
                setTodoOrder((prevOrder => [...prevOrder, sourceId]));
                if (item.status === "inProgress"){
                    setInProgressOrder(prevOrder => prevOrder.filter(id => id !== sourceId));
                } else if (item.status === "done"){
                    setDoneOrder(prevOrder => prevOrder.filter(id => id !== sourceId));
                }
            }
            // reorder within the todo section
            else if (sourceId !== destinationId) {
                reorderTasks(sourceId, destinationId, todoOrder, setTodoOrder);
            }
        },
    }));
    
    const [, dropInProgress] = useDrop(() => ({
        accept: 'task',
        drop: (item, monitor) => {
            const sourceId = item.id;
            const destinationId = monitor.getItem().id;
            // move from other sections to inProgress Section
            if (item.status !== "inProgress"){
                updateTask({ ...tasks[item.id], status: 'inProgress' });
                setInProgressOrder((prevOrder => [...prevOrder, sourceId]));
                if (item.status === "todo"){
                    setTodoOrder(prevOrder => prevOrder.filter(id => id !== sourceId));
                } else if (item.status === "done"){
                    setDoneOrder(prevOrder => prevOrder.filter(id => id !== sourceId));
                }
            }
            // reorder within the inProgress section
            else if (sourceId !== destinationId) {
                reorderTasks(sourceId, destinationId, inProgressOrder, setInProgressOrder);
            }
        },
    }));
    
    const [, dropDone] = useDrop(() => ({
        accept: 'task',
        drop: (item, monitor) => {
            const sourceId = item.id;
            const destinationId = monitor.getItem().id;
            // move from other sections to done Section
            if (item.status !== "done"){
                updateTask({ ...tasks[item.id], status: 'done' });
                setDoneOrder((prevOrder => [...prevOrder, sourceId]));
                if (item.status === "todo"){
                    setTodoOrder(prevOrder => prevOrder.filter(id => id !== sourceId));
                } else if (item.status === "inProgress"){
                    setInProgressOrder(prevOrder => prevOrder.filter(id => id !== sourceId));
                }
            }
            // reorder within the done section
            else if (sourceId !== destinationId) {
                reorderTasks(sourceId, destinationId, doneOrder, setDoneOrder);
            }
        },
    }));

    const deleteTask = (taskId) => {
        const updatedTasks = {...tasks};
        delete updatedTasks[taskId];
        setTasks(updatedTasks);
        // remove the tasks from order list
        setTodoOrder(prevOrder => prevOrder.filter(id => id !== taskId));
        setInProgressOrder(prevOrder => prevOrder.filter(id => id !== taskId));
        setDoneOrder(prevOrder => prevOrder.filter(id => id !== taskId));
    };

    return(
        <div className="task-container">
            <div className="add-task">
                <div className="add-task_priority-name" >
                    <PriorityButton 
                        priority={newTaskPriority} 
                        onPriorityChange={handlePriorityChange}
                    />
                    <Input
                        placeholder="Create a task..."
                        value={newTaskName}
                        onChange={handleNameChange}
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
                    
                    <div className="section_tasks-list" ref={dropTodo}>
                        {todoOrder.map((taskId) => (
                            <TaskCard 
                                key={taskId}
                                task={tasks[taskId]}
                                onUpdate={updateTask}
                                onDelete={deleteTask}
                                onComplete={completeTask}
                            />
                        ))}
                    </div>                    
                </div>
                <div className="section inProgress-section">
                <div className="section_header">
                        <div>
                            In Progress
                        </div>
                        <Chip label={numberOfProgressTask.toString()} size="small"/>
                    </div>
                    
                    <div className="section_tasks-list"  ref={dropInProgress}>
                        {inProgressOrder.map((taskId) => (
                            <TaskCard 
                                key={taskId}
                                task={tasks[taskId]}
                                onUpdate={updateTask}
                                onDelete={deleteTask}
                                onComplete={completeTask}
                            />
                        ))}
                    </div>               
                </div>
                <div className="section done-section">
                    <div className="section_header">
                        <div>
                            Done
                        </div>
                        <Chip label={numberOfDoneTask.toString()} size="small"/>
                    </div>
                    <div className="section_tasks-list"  ref={dropDone}>
                        {doneOrder.map((taskId) => (
                            <TaskCard 
                                key={taskId}
                                task={tasks[taskId]}
                                onUpdate={updateTask}
                                onDelete={deleteTask}
                                onComplete={completeTask}
                            />
                        ))}
                    </div>                    
                </div>
            </div>
        </div>
    )
};