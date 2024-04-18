import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskDisplayCard from "./TaskDisplayCard";
import { Button, Grid, MenuItem, FormControl, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TaskManager = () => {
	// State to manage tasks
	const [tasks, setTasks] = useState([]);

	// State to control the visibility of the task form
	const [isFormOpen, setIsFormOpen] = useState(false);

	// State to hold the currently selected task for editing
	const [selectedTask, setSelectedTask] = useState(null);

	// Default to show all tasks' catagories
	const [selectedCategory, setSelectedCategory] = useState("all");

	// Function to add a new task
	const handleAddTask = (newTask) => {
		setTasks([...tasks, newTask]); // Spread operator for immutability
		setIsFormOpen(false); // Close the form after adding
	};

	// Function to handle task deletion
	const handleDeleteTask = (taskToDelete) => {
		const taskIndex = tasks.findIndex((task) => task === taskToDelete);
		if (taskIndex !== -1) {
			// Check if task found
			setTasks([...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)]);
		} else {
			console.warn("Task to delete not found"); // Handle potential missing task
		}
	};

	// Function to open the task form for adding
	const handleOpenForm = () => {
		setSelectedTask(null); // Clear selected task for adding
		setIsFormOpen(true); // Open the form
	};

	const handleEditTask = (task, updatedData) => {
		setSelectedTask(task); // Set selected task for editing
		setIsFormOpen(true); // Open the form

		// Check if selected task exists before update
		if (selectedTask) {
			const taskIndex = tasks.findIndex((t) => t === selectedTask);

			if (taskIndex !== -1) {
				// Create a new task object with updated data
				const updatedTask = { ...task, ...updatedData };

				// Update the tasks state with the new object at the index
				setTasks((prevTasks) =>
					prevTasks.map((t, index) => (index === taskIndex ? updatedTask : t))
				);
			} else {
				console.warn("Task to edit not found");
			}
		} else {
			console.warn("No selected task for editing");
		}
	};

	// Function to handle user selecting a category filter
	const handleCategoryChange = (event) => {
		setSelectedCategory(event.target.value);
	};

	return (
		<div>
			<div
				style={{
					paddingLeft: "20px",
					backgroundColor: "#212121",
					display: "flex",
					justifyContent: "space-between",
					//alignItems: "center",
				}}
			>
				<Select
					value={selectedCategory}
					onChange={handleCategoryChange}
					style={{ color: "white", marginRight: "10px", fontSize: "16px" }}
				>
					<MenuItem value="all">All Tasks</MenuItem>
					<MenuItem value="to-do">To Do</MenuItem>
					<MenuItem value="progress">In Progress</MenuItem>
					<MenuItem value="completed">Completed</MenuItem>
					<MenuItem value="done">Done</MenuItem>
				</Select>
				<Button
					size="large"
					style={{ color: "white", fontSize: "16px", textTransform: "none", paddingRight:"20px" }}
					aria-label="add"
					onClick={handleOpenForm}
				>
					<AddIcon /> Add Task
				</Button>
			</div>

			{/* Conditionally render TaskForm for adding or editing */}
			{isFormOpen && (
				<TaskForm
					initialTask={selectedTask || {}} // Pass selected task or empty object for new task
					onSubmit={selectedTask ? handleEditTask : handleAddTask} // Handle edit or add based on selected task
					isFormOpen={isFormOpen}
					setIsFormOpen={setIsFormOpen}
				/>
			)}
			<Grid
				container
				justifyContent={"left"}
				alignItems={"left"}
				spacing={2}
				padding={"20px"}
			>
				{tasks.map((task) => (
					<Grid
						item
						key={task}
						xs={12}
						sm={6}
						md={6}
						lg={3}
						style={{ minWidth: "450px", width: "100%" }} // Adjust minWidth as needed
					>
						<TaskDisplayCard
							task={task}
							onDelete={() => handleDeleteTask(task)}
							onEdit={() => handleEditTask(task)}
						/>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default TaskManager;
