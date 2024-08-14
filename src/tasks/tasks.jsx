import React, {useState, useEffect} from 'react';
import './tasks.css';
import { colors } from '../colors/colors';
import { v4 as uuidv4 } from 'uuid';
import PriorityButton from './priorityButton';
import CustomInput from '../input/cutomInput';
import Section from './section';
import TaskCard from './taskCard';
import { DndContext, closestCorners, DragOverlay } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { IconButton } from '@mui/material';
import CustomTooltip from '../Tooltip/customTooltip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
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
    const [activeId, setActiveId] = useState(null);

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
            console.log('New task added', newTask);
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

    const deleteTask = async(taskId) => {
        try {
             // Delete task from Firestore
            const userDocRef = doc (db, 'users', user.uid);
            const tasksCollectionRef = collection(userDocRef, 'tasks')
            const taskDocRef = doc(tasksCollectionRef , taskId); // Replace 'tasks' with your collection name
            await deleteDoc(taskDocRef);

            const updatedTasks = {...tasks};
            delete updatedTasks[taskId];
            setTasks(updatedTasks);

            // remove the tasks from order list
            setTodoOrder(prevOrder => prevOrder.filter(id => id !== taskId));
            setInProgressOrder(prevOrder => prevOrder.filter(id => id !== taskId));
            setDoneOrder(prevOrder => prevOrder.filter(id => id !== taskId));

            // Update the order in Firestore
            await updateDoc(userDocRef, {
                todoOrder: todoOrder.filter(id => id !== taskId),
                inProgressOrder: inProgressOrder.filter(id => id !== taskId),
                doneOrder: doneOrder.filter(id => id !== taskId)
            });

        } catch (error) {
            console.log('Error deleting a task in firestore', error)
        }
    };

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveId(active.id);
    }

    const handleDragEnd = async (event) => {
        const {  over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activeStatus = getTaskStatus(activeId);
        // Check if we're dropping onto a section or a task
        const isDropOnSection = over.id.includes('-section');
        const overStatus = isDropOnSection ? getSectionStatus(over.id) : getTaskStatus(over.id);

        try {
            await runTransaction(db, async (transaction) => {
                if (activeStatus !== overStatus) {
                    // Moving to a different section
                    const activeTask = tasks[activeId];
                    const updatedTask = { ...activeTask, status: overStatus };
              
                    // Remove from the original section
                    const sourceOrder = getOrderByStatus(activeStatus);
                    const updatedSourceOrder = sourceOrder.filter(id => id !== activeId);
                    setOrderByStatus(activeStatus, updatedSourceOrder);
              
                    // Add to the new section
                    const destinationOrder = getOrderByStatus(overStatus);
                    const updatedDestinationOrder = [activeId, ...destinationOrder];
                    setOrderByStatus(overStatus, updatedDestinationOrder);
              
                    // Update the task
                    setTasks(prev => ({ ...prev, [activeId]: updatedTask }));
                    
                    // Update tasks in Firestore
                    const userDocRef = doc(db, "users", user.uid);
                    const tasksCollectionRef = collection(userDocRef, "tasks");
                    const taskDocRef = doc (tasksCollectionRef, activeId);
                    transaction.update(taskDocRef, { status: overStatus});

                    // Update order in Firestore
                    transaction.update(userDocRef, {
                        [`${activeStatus}Order`]: updatedSourceOrder,
                        [`${overStatus}Order`]: updatedDestinationOrder,
                    });

                  } else {
                    // Reordering within the same section
                    const currentOrder = getOrderByStatus(activeStatus);
                    const oldIndex = currentOrder.indexOf(activeId);
                    const newIndex = isDropOnSection ? 0 : currentOrder.indexOf(over.id);
                    if (oldIndex !== newIndex) {
                        const newOrder = arrayMove(currentOrder, oldIndex, newIndex);
                        setOrderByStatus(activeStatus, newOrder);

                        // Update order in Firestore
                        const userDocRef = doc(db, "users", user.uid);
                        transaction.update(userDocRef, {
                            [`${activeStatus}Order`]: newOrder
                        });
                    }
                  }
            });
            console.log("Firestore updated successfully after drag");

        } catch (error) {
            console.error("Error updating Firestore after drag:", error);
        } finally {
            setActiveId(null);  // Reset activeId after all operations
        }
    };

    const getTaskStatus = (taskId) => {
        if (todoOrder.includes(taskId)) return 'todo';
        if (inProgressOrder.includes(taskId)) return 'inProgress';
        if (doneOrder.includes(taskId)) return 'done';
        return null;
    };
    
    const getSectionStatus = (containerId) => {
        if (containerId.includes('todo-section')) return 'todo';
        if (containerId.includes('inProgress-section')) return 'inProgress';
        if (containerId.includes('done-section')) return 'done';
        return null;
    };

    const getOrderByStatus = (status) => {
        switch (status) {
          case 'todo': return todoOrder;
          case 'inProgress': return inProgressOrder;
          case 'done': return doneOrder;
          default: return [];
        }
      };
    
    const setOrderByStatus = (status, newOrder) => {
        switch (status) {
            case 'todo': setTodoOrder(newOrder); break;
            case 'inProgress': setInProgressOrder(newOrder); break;
            case 'done': setDoneOrder(newOrder); break;
            default: return [];
        }
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
            <DndContext 
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd} 
                collisionDetection={closestCorners}
            > 
                <div className="sections">
                    <Section 
                        id="todo" 
                        title="To Do" 
                        tasks={tasks} 
                        taskIds={todoOrder} 
                        numberOfCards={numberOfTodoTask} 
                        onUpdate={updateTask}
                        onDelete={deleteTask}
                        onComplete={completeTask}
                    />
                    <Section 
                        id="inProgress" 
                        title="In Progres" 
                        tasks={tasks} 
                        taskIds={inProgressOrder} 
                        numberOfCards={numberOfProgressTask} 
                        onUpdate={updateTask}
                        onDelete={deleteTask}
                        onComplete={completeTask}
                    />
                    <Section 
                        id="done" 
                        title="Done" 
                        tasks={tasks} 
                        taskIds={doneOrder} 
                        numberOfCards={numberOfDoneTask} 
                        onUpdate={updateTask}
                        onDelete={deleteTask}
                        onComplete={completeTask}
                    />
                </div>
                {
                    <DragOverlay>
                    {activeId ? (
                        <TaskCard
                        id={activeId}
                        task={tasks[activeId]}
                        onUpdate={updateTask}
                        onDelete={deleteTask}
                        onComplete={completeTask}
                        isDragging={true}
                        />
                    ) : null}
                    </DragOverlay>
                }
            </DndContext>
        </div>
    )
};