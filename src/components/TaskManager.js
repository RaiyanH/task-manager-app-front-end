import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskDisplayCard from "./TaskDisplayCard";
import TaskOrganizer from "./TaskOrganizer";
import "../styles/TaskManager.css";
import PendingIcon from '@mui/icons-material/Pending';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "axios";

const TaskManager = () => {

	const [tasks, setTasks] = useState([]);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [selectedStatus, setSelectedStatus] = useState("all");

	console.log("Select Status:", selectedStatus, "Render cycle:", new Date().toISOString());

	//Fetch tasks from the backend when the component mounts
	useEffect(() => {
		axios.get("http://localhost:8080/api/tasks")
			.then(response => {
				console.log("API Response:", response.data); // Debugging: see the actual data
				if (Array.isArray(response.data)) {
					setTasks(response.data); // Only set if it's an array
				} else {
					console.error("API did not return an array:", response.data);
					setTasks([]); // Default to an empty array if the response is invalid
				}
			})
			.catch(error => {
				console.error("Error fetching tasks:", error);
				setTasks([]); // Set an empty array on error
			});
	}, []);

	const handleAddTask = (newTask) => {
		console.log('New Task to add:', newTask);
		axios.post('http://localhost:8080/api/tasks/addTask', newTask)
			.then(response => {
				setTasks((prevTasks) => [...prevTasks, response.data]);
			})
			.catch(error => console.error("Error adding tasks: ", error));
		setIsFormOpen(false);
	};

	const handleDeleteTask = (taskToDelete) => {
		axios.delete(`http://localhost:8080/api/tasks/deleteTaskById/${taskToDelete.id}`)
			.then(() => {
				setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskToDelete.id));
			})
			.catch(error => console.error("Error deleting task: ", error))
	};

	const handleOpenForm = () => {
		console.log("Opening form for new task");
		setSelectedTask(null); // Clear selected task for adding
		setIsFormOpen(true);
	};

	const handleEditTask = (updatedTask) => {
		setSelectedTask(updatedTask)
		setIsFormOpen(true)
		console.log("Editing task with id:", updatedTask.id);
		console.log("Updated task data:", updatedTask);
		axios.put(`http://localhost:8080/api/tasks/${updatedTask.id}`, updatedTask)
			.then(response => {
				setTasks((prevTasks) =>
					prevTasks.map((task) => (task.id === response.data.id ? response.data : task))
				);
			})
			.catch(error => console.error("Error updating task: ", error));
	};

	// Function to handle user selecting a category filter
	const handleStatusChange = (event) => {
		setSelectedStatus(event.target.value);
	};

	const filteredTasks = tasks.filter((task) => {
		console.log("Filtering Task:", task); //this produces an object with key and value pairs
		if (selectedStatus === "all") return true;
		console.log("Task Status:", task.taskStatus, "Selected Status:", selectedStatus); // Debugging line: this debugging line does not appear at all
		// Instead of strict equality, check if the category exists in the task
		return task.taskStatus && task.taskStatus.includes(selectedStatus);
	});


	return (
		<div className="container">
			<main className="main">
				<TaskOrganizer
					value={selectedStatus}
					onChange={handleStatusChange}
					onClick={handleOpenForm}
				/>
				{/* Conditionally render TaskForm for adding or editing */}
				{
					isFormOpen && (
						<TaskForm
							initialTask={selectedTask || {}} // Pass selected task or empty object for new task
							onSubmit={selectedTask ? handleEditTask : handleAddTask} // Handle edit or add based on selected task
							isFormOpen={isFormOpen}
							setIsFormOpen={setIsFormOpen}
						/>
					)
				}
				<section className="taskContainer" style={{ fontFamily: "Arial" }}>
					<section className="taskColumn">
						<h4 style={{ backgroundColor: "#222831", borderRadius: "5px", padding: "10px 0 10px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
							<PendingIcon />To Do
						</h4>
						{filteredTasks.filter((task) => task.taskStatus === "To do")
							.map((task) =>
							(<article key={task.id}>
								<TaskDisplayCard
									task={task}
									onDelete={() => handleDeleteTask(task)}
									onEdit={() => handleEditTask(task)}
								/>
							</article>))}
					</section>
					<section className="taskColumn">
						<h4 style={{ backgroundColor: "#222831", borderRadius: "5px", padding: "10px 0 10px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
							<HourglassBottomIcon /> In Progress
						</h4>
						{filteredTasks.filter((task) => task.taskStatus === "Progress")
							.map((task) =>
							(<article key={task.id}>
								<TaskDisplayCard
									task={task}
									onDelete={() => handleDeleteTask(task)}
									onEdit={() => handleEditTask(task)}
								/>
							</article>))}
					</section>
					<section className="taskColumn">
						<h4 style={{ backgroundColor: "#222831", borderRadius: "5px", padding: "10px 0 10px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
							<CheckCircleIcon />Completed
						</h4>
						{filteredTasks.filter((task) => task.taskStatus === "Completed")
							.map((task) =>
							(<article key={task.id}>
								<TaskDisplayCard
									task={task}
									onDelete={() => handleDeleteTask(task)}
									onEdit={() => handleEditTask(task)}
								/>
							</article>))}
					</section>
				</section>
			</main >
		</div>
	);
};

export default TaskManager;
