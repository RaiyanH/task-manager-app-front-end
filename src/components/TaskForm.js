import React, { useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	TextField,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from "@mui/material";

const TaskForm = ({ initialTask, onSubmit, isFormOpen, setIsFormOpen }) => {
	const [title, setTitle] = useState(
		initialTask.title ? initialTask.title : ""
	);
	const [description, setDescription] = useState(
		initialTask.description ? initialTask.description : ""
	);

	const [priority, setPriority] = useState(
		initialTask.priority ? initialTask.priority : "3"
	);
	const [deadline, setDeadline] = useState(
		initialTask.deadline ? initialTask.deadline : ""
	);

	const handleClose = () => {
		if (
			Object.keys(initialTask).length === 0 ||
			Object.keys(initialTask).length > 0
		) {
			// Add operation: reset form and close
			setIsFormOpen(false);
		} else {
			// Update operation: close without resetting
			onSubmit({ title: "", description: "", priority: "3", deadline: "" });
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		//onSubmit({ title, priority, description, deadline });
		const updatedData = {
			title,
			description,
			priority,
			deadline,
		};

		if (Object.keys(initialTask).length > 0) {
			onSubmit(updatedData); // Pass updated data for edits
		} else {
			onSubmit({ title, description, priority, deadline }); // New task data
		}

		setIsFormOpen(false);
	};

	// The following hook and two functions are there to fix the overlapping style issue in Deadline.

	const [showFormat, setShowFormat] = useState(false);

	const handleFocus = () => {
		setShowFormat(true);
	};

	const handleBlur = () => {
		setShowFormat(false);
	};

	return (
		<Dialog open={isFormOpen} onClose={handleClose}>
			<DialogTitle>
				{Object.keys(initialTask).length > 0 ? "Update Task" : "Add Task"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Please fill out the form to {Object.keys(initialTask).length > 0 ? "update" : "add"} a task.
				</DialogContentText>
				<TextField
					label="Title"
					type="text"
					autoFocus
					margin="dense"
					fullWidth
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<TextField
					label="Description"
					margin="dense"
					multiline
					rows={4}
					fullWidth
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<FormControl fullWidth margin="dense">
					<InputLabel label="priority-label">Priority</InputLabel>
					<Select
						label="priority-label"
						value={priority}
						onChange={(e) => setPriority(e.target.value)}
					>
						<MenuItem value="1">1</MenuItem>
						<MenuItem value="2">2</MenuItem>
						<MenuItem value="3">3</MenuItem>
						<MenuItem value="4">4</MenuItem>
						<MenuItem value="5">5</MenuItem>
					</Select>
				</FormControl>
				<TextField
					label="Deadline"
					margin="dense"
					type="date"
					fullWidth
					sx={{
						"& .MuiInputBase-input": {
							// Style the input field
							color: showFormat ? "black" : "transparent", // Transparent color when not focused
							transition: "color 0.2s ease-in-out",
						},
					}}
					value={deadline}
					onChange={(e) => setDeadline(e.target.value)}
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholder="Deadline" // Set placeholder for out-of-focus state
				/>
			</DialogContent>
			<DialogActions>
				<Button type="cancel" onClick={handleClose} sx={{color:"#e91e63"}}>
					Cancel
				</Button>
				<Button type="submit" onClick={handleSubmit} sx={{color:"#009688"}}>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TaskForm;
