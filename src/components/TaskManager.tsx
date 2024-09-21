import React, { useState, useEffect } from "react";
import TaskFormWrapper from "./TaskFormWrapper";
import TaskOrganizer from "./TaskOrganizer";
import FilteredTaskList from "./FilteredTaskList";
import axios from "axios";
import "../styles/TaskManager.css";
import { SelectChangeEvent } from "@mui/material";
import { Task } from "./types"; // Import the unified Task type

const TaskManager: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]); // Type state as Task array
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false); // Type state as boolean
	const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Type as Task or null
	const [selectedStatus, setSelectedStatus] = useState<string>("all"); // Type as string

	axios.defaults.baseURL = "http://localhost:8080/api/tasks";

	useEffect(() => {
		const handleGetAllTask = async () => {
			try {
				const response = await axios.get("");
				setTasks(Array.isArray(response.data) ? response.data : []);
			} catch (error) {
				console.error("Error fetching tasks:", error);
				setTasks([]);
			}
		};
		handleGetAllTask();
	}, []);

	const handleAddTask = async (newTask: Task) => {
		try {
			const response = await axios.post("/addTask", newTask);
			setTasks((prevTasks) => [...prevTasks, response.data]);
		} catch (error) {
			console.error("Error adding task:", error);
		}
		setIsFormOpen(false);
	};

	const handleEditTask = async (updatedTask: Task) => {
		setSelectedTask(updatedTask);
		setIsFormOpen(true);
		try {
			const response = await axios.put(`/${updatedTask.id}`, updatedTask);
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === response.data.id ? response.data : task
				)
			);
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};

	const handleDeleteTask = async (taskToDelete: Task) => {
		try {
			await axios.delete(`/deleteTaskById/${taskToDelete.id}`);
			setTasks((prevTasks) =>
				prevTasks.filter((task) => task.id !== taskToDelete.id)
			);
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	};

	const handleStatusChange = (event: SelectChangeEvent) => {
		setSelectedStatus(event.target.value);
	};

	const filteredTasks = tasks.filter((task) => {
		if (selectedStatus === "all") return true;
		return task.taskStatus && task.taskStatus.includes(selectedStatus);
	});

	return (
		<div className="container">
			<main className="main">
				<TaskOrganizer
					value={selectedStatus}
					onChange={handleStatusChange}
					onClick={() => setIsFormOpen(true)}
				/>
				<TaskFormWrapper
					selectedTask={selectedTask}
					isFormOpen={isFormOpen}
					setIsFormOpen={setIsFormOpen}
					handleAddTask={handleAddTask}
					handleEditTask={handleEditTask}
				/>
				<FilteredTaskList
					tasks={filteredTasks}
					onDelete={handleDeleteTask}
					onEdit={handleEditTask}
				/>
			</main>
		</div>
	);
};

export default TaskManager;
