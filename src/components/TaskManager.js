import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskDisplayCard from "./TaskDisplayCard";
import TaskOrganizer from "./TaskOrganizer";
import "../styles/TaskManager.css";
import { v4 as uuidv4 } from 'uuid';
import PendingIcon from '@mui/icons-material/Pending';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TaskManager = () => {

	const [tasks, setTasks] = useState([]);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState(null);
	const [selectedStatus, setSelectedStatus] = useState("all");

	console.log("Select Status:", selectedStatus, "Render cycle:", new Date().toISOString());

	const handleAddTask = (newTask) => {
		const taskId = { id: uuidv4(), ...newTask };
		console.log(taskId)
		setTasks((prevTasks) => [...prevTasks, taskId]);
		setIsFormOpen(false);
	};

	const handleDeleteTask = (taskToDelete) => {
		//Go through the tasks array and return a new array by removing task matching task that has to be deleted
		const newTasks = tasks.filter(task => task.id !== taskToDelete.id);
		//Extra code to ensure that the newTasks array is with deleted task before returning the new array 
		if (newTasks.length !== tasks.length) {
			setTasks(newTasks);
		} else {
			console.warn("Task to delete was not found.");
		}
	};

	const handleOpenForm = () => {
		setSelectedTask(null); // Clear selected task for adding
		setIsFormOpen(true);
	};

	const handleEditTask = (updatedTask) => {
		setIsFormOpen(true)
		console.log("Editing task with id:", updatedTask.id);
		console.log("Updated task data:", updatedTask);
		setTasks((prevTasks) =>
			prevTasks.map((t) =>
				t.id === updatedTask.id ? updatedTask : t
			)
		);
		setSelectedTask(updatedTask)
	};

	// Function to handle user selecting a category filter
	const handleStatusChange = (event) => {
		setSelectedStatus(event.target.value);
	};

	const filteredTasks = tasks.filter((task) => {
		console.log("Filtering Task:", task); //this produces an object with key and value pairs
		if (selectedStatus === "all") return true;
		console.log("Task Status:", task.status, "Selected Status:", selectedStatus); // Debugging line: this debugging line does not appear at all
		// Instead of strict equality, check if the category exists in the task
		return task.status && task.status.includes(selectedStatus);
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
						{filteredTasks.filter((task) => task.status === "To do")
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
						{filteredTasks.filter((task) => task.status === "Progress")
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
						{filteredTasks.filter((task) => task.status === "Completed")
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
