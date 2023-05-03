import React, { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import deleteIcon from "../assets/delete.svg"
import doneIcon from "../assets/done.svg"

function ToDo() {
    const [tasks, setTasks] = useState([])
    const [taskName, setTaskName] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const name = localStorage.getItem('name')
        if (!name) {
            navigate('../')
        }
    }, [navigate])

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
        setTasks(storedTasks)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('name')
        localStorage.removeItem('profilePicture')
        localStorage.removeItem('tasks')

        const name = localStorage.getItem('name')

        if (!name) {
            navigate('../')
        }
    }

    const handleAddTask = () => {
        if (taskName.trim() !== "") {
            const newTask = {
                id: Date.now(),
                name: taskName,
                completed: false,
            }
            setTasks([...tasks, newTask])
            setTaskName("")
            updateLocalStorage([...tasks, newTask])
        } else {
            alert("Please enter a task")
        }
    }

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId)
        setTasks(updatedTasks)
        updateLocalStorage(updatedTasks)
    }

    const handleTaskStatusChange = (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed }
            }
            return task
        })
        setTasks(updatedTasks)
        updateLocalStorage(updatedTasks)
    }

    const updateLocalStorage = (updatedTasks) => {
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    }

    return (
        <div className="todoPage">
            <Navbar />
            <section className="todoSection">
                <button className="logOutButton" onClick={handleLogout}>Log Out</button>
                <h1 className="addYorDailyTasks">Add Your Daily Tasks</h1>
                <div className="taskInputContainer">
                    <input
                        id="name"
                        className="todoInput"
                        type="text"
                        placeholder="my task"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <button className="addTaskButton" onClick={handleAddTask}>Add</button>
                </div>
                <ul>
                    {tasks.map((task) => (
                        <li className={`taskList ${task.completed ? 'completed' : ''}`} key={task.id}>
                            <span className="taskLines">{task.name}</span>
                            <div className="listButtons">
                                <button className={`doneButton ${task.completed ? 'completed' : ''}`} onClick={() => handleTaskStatusChange(task.id)}>
                                    <img src={doneIcon} alt="done"></img>
                                    {task.completed ? 'Undo' : 'Done'}
                                </button>
                                <button className={`deleteButton ${task.completed ? 'completed' : ''}`} onClick={() => handleDeleteTask(task.id)}>
                                    <img src={deleteIcon} alt="delete"></img>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default ToDo