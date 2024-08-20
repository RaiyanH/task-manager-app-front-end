import React, { useState } from "react";
import TaskForm from "./TaskForm";
import Category from "./Category";
import TaskDisplayCard from "./TaskDisplayCard";
import { Button, Grid, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from 'uuid';

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
					value={selectedStatus}
					onChange={handleStatusChange}
					style={{ color: "white", marginRight: "10px", fontSize: "16px" }}
					sx={{
						"& .MuiSelect-icon": {
							// Target the icon element
							color: "white",
						},
					}}
				>
					<MenuItem value="all">All Tasks</MenuItem>
					<MenuItem value="To do">To Do</MenuItem>
					<MenuItem value="Progress">In Progress</MenuItem>
					<MenuItem value="Completed">Completed</MenuItem>
				</Select>
				<Button
					size="large"
					style={{
						color: "white",
						fontSize: "16px",
						textTransform: "none",
						paddingRight: "20px",
					}}
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
<Grid container spacing={2} padding={"20px"}>
				<h2 style={{ width: "100%", paddingLeft: "20px" }}>To Do</h2>
				{filteredTasks
					.filter((task) => task.status === "To do")
					.map((task) => (
						<Grid
							item
							key={task.title} // Use a unique identifier (e.g., task.id) if available
							xs={12}
							sm={6}
							md={3}
							lg={3}
							style={{ minWidth: "450px", width: "100%" }}
						>
							<TaskDisplayCard
								task={task}
								onDelete={() => handleDeleteTask(task)}
								onEdit={() => handleEditTask(task)}
							/>
						</Grid>
					))}
			</Grid>
			<Grid container spacing={2} padding={"20px"}>
				<h2 style={{ width: "100%", paddingLeft: "20px" }}>In Progress</h2>
				{filteredTasks
					.filter((task) => task.status === "Progress")
					.map((task) => (
						<Grid
							item
							key={task.title}
							xs={12}
							sm={6}
							md={3}
							lg={3}
							style={{ minWidth: "450px", width: "100%" }}
						>
							<TaskDisplayCard
								task={task}
								onDelete={() => handleDeleteTask(task)}
								onEdit={() => handleEditTask(task)}
							/>
						</Grid>
					))}
			</Grid>
			<Grid container spacing={2} padding={"20px"}>
				<h2 style={{ width: "100%", paddingLeft: "20px" }}>Completed</h2>
				{filteredTasks
					.filter((task) => task.status === "Completed")
					.map((task) => (
						<Grid
							item
							key={task.title}
							xs={6}
							sm={6}
							md={3}
							lg={3}
							style={{ minWidth: "450px", width: "100%" }}
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
