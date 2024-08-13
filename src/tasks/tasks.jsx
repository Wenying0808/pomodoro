import React, {useState, useEffect} from 'react';
import './tasks.css';
import { colors } from '../colors/colors';
import { v4 as uuidv4 } from 'uuid';
import TaskCard from './taskCard';
import PriorityButton from './priorityButton';
import CustomInput from '../input/cutomInput';
import { IconButton, Chip } from '@mui/material';
import CustomTooltip from '../Tooltip/customTooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDrop } from 'react-dnd';
import { collection, doc, updateDoc, deleteDoc, runTransaction } from 'firebase/firestore';
import { db } from '../.env/firebase';

export default function Tasks({ 
    user, 
    tasks, 
    setTasks, 
    todoOrder, 
    inProgressOrder, 
    doneOrder,
    setTodoOrder,
    setInProgressOrder,
    setDoneOrder  
}) {

    const [newTaskPriority, setNewTaskPriority] = useState('low');
    const [newTaskName, setNewTaskName] = useState('');

    const [numberOfTodoTask, setnumberOfTodoTask] = useState(0);
    const [numberOfProgressTask, setnumberOfProgressTask] = useState(0);
    const [numberOfDoneTask, setnumberOfDoneTask] = useState(0);

    useEffect(() => {
        setnumberOfTodoTask(todoOrder.length);
        setnumberOfProgressTask(inProgressOrder.length);
        setnumberOfDoneTask(doneOrder.length);
    }, [todoOrder, inProgressOrder, doneOrder]);

    console.log ("initial to do order in tasks file", todoOrder);

    const handlePriorityChange = (newPriority) => {
        setNewTaskPriority(newPriority);
    };
    const handleNameChange = (event) => {
        setNewTaskName(event.target.value);
    };

    const addTask = async () => {
        const newTaskId = uuidv4();
        const newTask = {
            id: newTaskId ,
            name: newTaskName,
            priority: newTaskPriority,
            status: 'todo'
        }
        // add a task doc in firestore
        try {
            // get the clock collection under usercollection
            await runTransaction(db, async (transaction) => {
                const userDocRef = doc(db, "users", user.uid);
                const tasksCollectionRef = collection(userDocRef, "tasks");
                const taskDocRef = doc(tasksCollectionRef, newTaskId);
                transaction.set(taskDocRef, newTask);
                setTasks(prevTasks => ({ ...prevTasks, [newTaskId]: newTask }));
                setNewTaskName('');
                setNewTaskPriority('low');
                setTodoOrder(prevOrder => [newTaskId, ...prevOrder]);
            });
        } catch (error) {
            console.error('Error adding task in firestore:', error);
        }
    };

    const updateTask = async(updatedTask) => {
        try {
            console.log('Updating task:', updatedTask); 

            if (!updatedTask.id) {
                console.error('Task ID is missing');
                return;
            }
             // Create a reference to the specific task document using its ID
            const userDocRef = doc(db, "users", user.uid);
            const tasksCollectionRef = collection(userDocRef, "tasks");
            const taskDocRef = doc(tasksCollectionRef, updatedTask.id);

            const updatedData = {
                id: updatedTask.id,
                name: updatedTask.name,
                priority: updatedTask.priority,
                status: updatedTask.status,
            }

            await updateDoc(taskDocRef, updatedData);

            setTasks((prevTasks) => ({ ...prevTasks, [updatedTask.id]: updatedTask }));
            console.log(`Task ${updatedTask.id} updated successfully`);
        } catch (error) {
            console.error('Error updating task in firestore:', error);
        }
    };

    const completeTask = async (taskId) => {
        const task = tasks[taskId];
        const updatedTask = {...task, status: "done"};
        await updateTask(updatedTask);
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
        
        if (sourceIndex === -1 || destinationIndex === -1) return;

        // remove from sourceIndex
        newOrder.splice(sourceIndex, 1);
        // insert it into destinationIndex
        newOrder.splice(destinationIndex, 0, sourceId);
        setSourceList(newOrder);
    };
 
    const [, dropTodo] = useDrop(() => ({
        accept: 'task',
        hover: (item, monitor) => {
            const draggedId = item.id;
            const overId = monitor.getItem().id;         
            if (draggedId === overId) return;
            if (item.status === 'todo') {
                reorderTasks(draggedId, overId, todoOrder, setTodoOrder);
            }
        },
        drop: (item) => {
            const sourceId = item.id;
            // move from other sections to todo Section
            if (item.status !== "todo"){
                const updatedTask = { ...item, status: 'todo' };
                updateTask(updatedTask);
                setTodoOrder((prevOrder => [...prevOrder, sourceId]));
                if (item.status === "inProgress"){
                    setInProgressOrder(prevOrder => prevOrder.filter(id => id !== sourceId));
                } else if (item.status === "done"){
                    setDoneOrder(prevOrder => prevOrder.filter(id => id !== sourceId));
                }
            }
        },
    }));
    
    const [, dropInProgress] = useDrop(() => ({
        accept: 'task',
        hover: (item, monitor) => {
            const draggedId = item.id;
            const overId = monitor.getItem().id;         
            if (draggedId === overId) return;
            if (item.status === 'inProgress') {
                reorderTasks(draggedId, overId, inProgressOrder, setInProgressOrder);
            }
        },
        drop: (item) => {
            const sourceId = item.id;
            // move from other sections to todo Section
            if (item.status !== "inProgress"){
                const updatedTask = { ...item, status: 'inProgress' };
                updateTask(updatedTask);
                setInProgressOrder((prevOrder => [...prevOrder, sourceId]));
                if (item.status === "todo"){
                    setTodoOrder(prevOrder => prevOrder.filter(id => id !== sourceId));
                } else if (item.status === "done"){
                    setDoneOrder(prevOrder => prevOrder.filter(id => id !== sourceId));
                }
            }
        },
    }));
    
    const [, dropDone] = useDrop(() => ({
        accept: 'task',
        hover: (item, monitor) => {
            const draggedId = item.id;
            const overId = monitor.getItem().id;         
            if (draggedId === overId) return;
            if (item.status === 'done') {
                reorderTasks(draggedId, overId, doneOrder, setDoneOrder);
            }
        },
        drop: (item) => {
            const sourceId = item.id;
            // move from other sections to todo Section
            if (item.status !== "done"){
                const updatedTask = { ...item, status: 'done' };
                updateTask(updatedTask);
                setDoneOrder((prevOrder => [...prevOrder, sourceId]));
                if (item.status === "todo"){
                    setTodoOrder(prevOrder => prevOrder.filter(id => id !== sourceId));
                } else if (item.status === "inProgress"){
                    setInProgressOrder(prevOrder => prevOrder.filter(id => id !== sourceId));
                }
            }
        },
    }));

    const deleteTask = async(taskId) => {
        try {
             // Delete task from Firestore
            const userRef = doc (db, 'users', user.uid);
            const tasksCollectionRef = collection(userRef, 'tasks')
            const taskRef = doc(tasksCollectionRef , taskId); // Replace 'tasks' with your collection name
            await deleteDoc(taskRef);

            const updatedTasks = {...tasks};
            delete updatedTasks[taskId];
            setTasks(updatedTasks);
            // remove the tasks from order list
            setTodoOrder(prevOrder => prevOrder.filter(id => id !== taskId));
            setInProgressOrder(prevOrder => prevOrder.filter(id => id !== taskId));
            setDoneOrder(prevOrder => prevOrder.filter(id => id !== taskId));

        } catch (error) {
            console.log('Error deleting a task in firestore', error)
        }
    };

    const renderTaskCards = (orderList) => {
        return orderList.map((taskId) => {
          const task = tasks[taskId];
          if (!task) {
            return <div key={taskId}></div>; // Handle missing task data
          }
          return (
            <TaskCard
              key={taskId}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
              onComplete={completeTask}
            />
          );
        });
      };

    return(
        <div className="task-container">
            <div className="add-task">
                <div className="add-task_priority-name" >
                    <PriorityButton 
                        priority={newTaskPriority} 
                        onPriorityChange={handlePriorityChange}
                    />
                    <CustomInput
                        placeholder="Create a task..."
                        value={newTaskName}
                        onChange={handleNameChange}
                    />
                </div>
                <CustomTooltip title="Add Task" placement="top" arrow>
                    <IconButton onClick={addTask} disabled={newTaskName===''}>
                        <AddCircleIcon/>
                    </IconButton>
                </CustomTooltip>
               
            </div>
            <div className="sections">
                <div className="section todo-section">
                    <div className="section_header">
                        <div className="section_header_title">
                            Todo
                        </div>
                        <Chip label={numberOfTodoTask.toString()} size="small"/>
                    </div>
                    
                    <div className="section_tasks-list" ref={dropTodo}>
                        {renderTaskCards(todoOrder)}
                    </div>                    
                </div>
                <div className="section inProgress-section">
                <div className="section_header">
                        <div className="section_header_title">
                            In Progress
                        </div>
                        <Chip label={numberOfProgressTask.toString()} size="small"/>
                    </div>
                    
                    <div className="section_tasks-list"  ref={dropInProgress}>
                        {renderTaskCards(inProgressOrder)}
                    </div>               
                </div>
                <div className="section done-section">
                    <div className="section_header">
                        <div className="section_header_title">
                            Done
                        </div>
                        <Chip label={numberOfDoneTask.toString()} size="small"/>
                    </div>
                    <div className="section_tasks-list"  ref={dropDone}>
                        {renderTaskCards(doneOrder)}
                    </div>                    
                </div>
            </div>
        </div>
    )
};