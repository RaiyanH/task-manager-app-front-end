import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	Button,
} from "@mui/material";

import Title from "./Title";
import Description from "./Description";
import Priority from "./Priority";
import Deadline from "./Deadline";
import Status from "./Status";

const TaskForm = ({ initialTask = {}, onSubmit, isFormOpen, setIsFormOpen }) => {
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
	const [status, setStatus] = useState(
		initialTask.status ? initialTask.status : "To do"
	);

	// Sync state with initialTask when it changes
	useEffect(() => {
		if (initialTask) {
			setTitle(initialTask.title || "");
			setDescription(initialTask.description || "");
			setPriority(initialTask.priority || "3");
			setDeadline(initialTask.deadline || "");
			setStatus(initialTask.status || "To do");
		}
	}, [initialTask]);

	// const handleClose = () => {
	// 	if (
	// 		Object.keys(initialTask).length === 0 ||
	// 		Object.keys(initialTask).length > 0
	// 	) {
	// 		// Add operation: reset form and close
	// 		setIsFormOpen(false);
	// 	} else {
	// 		// Update operation: close without resetting
	// 		onSubmit({
	// 			title: "",
	// 			description: "",
	// 			priority: "3",
	// 			deadline: "",
	// 			status: "To do",
	// 		});
	// 	}
	// };
	const handleClose = () => {
		setIsFormOpen(false)
		if (initialTask.id === false){
			resetForm();
		}
	}

	const resetForm = () => {
		setTitle("");
		setDescription("");
		setPriority("3");
		setDeadline("");
		setStatus("To do");
	};

	// const handleSubmit = (event) => {
	// 	event.preventDefault();

	// 	const updatedData = {
	// 		title,
	// 		description,
	// 		priority,
	// 		deadline,
	// 		status,
	// 	};

	// 	if (Object.keys(initialTask).length > 0) {
	// 		onSubmit(updatedData); // Pass updated data for edits
	// 	} else {
	// 		onSubmit({ title, description, priority, deadline, status }); // New task data
	// 	}

	// 	setIsFormOpen(false);
	// };
	const handleSubmit = (event) => {
		event.preventDefault(); //precentDefault() what is its purpose as it it did not get shown as an option by intellij
		const updatedData = {title, description, priority, deadline, status,}
		if (initialTask.id){
			onSubmit({...initialTask, ...updatedData}) //Merge with initial Task to keep  the id for updates
		} else {
			onSubmit(updatedData)
		}
		setIsFormOpen(false)
		if (initialTask.id === false){
			resetForm();
		}
	}

	return (
		<Dialog open={isFormOpen} onClose={handleClose}>
			<DialogTitle>
				{initialTask.id ? "Update Task" : "Add Task"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Please fill out the form to{" "} {initialTask.id ? "update" : "add"} a task.
				</DialogContentText>
				<Title value={title} onChange={(e) => setTitle(e.target.value)} />
				<Description
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<Priority
					value={priority}
					onChange={(e) => setPriority(e.target.value)}
				/>
				<Deadline
					value={deadline}
					onChange={(e) => setDeadline(e.target.value)}
				/>
				<Status
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button type="cancel" onClick={handleClose} sx={{ color: "#e91e63" }}>
					Cancel
				</Button>
				<Button type="submit" onClick={handleSubmit} sx={{ color: "#009688" }}>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TaskForm;
