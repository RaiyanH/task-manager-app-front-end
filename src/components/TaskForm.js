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
	const [taskTitle, setTaskTitle] = useState(
		initialTask.taskTitle ? initialTask.title : ""
	);
	const [taskDescription, setTaskDescription] = useState(
		initialTask.taskDescription ? initialTask.taskDescription : ""
	);
	const [taskPriority, setTaskPriority] = useState(
		initialTask.taskPriority ? initialTask.taskPriority : "3"
	);
	const [taskDeadline, setTaskDeadline] = useState(
		initialTask.taskDeadline ? initialTask.taskDeadline : ""
	);
	const [taskStatus, setTaskStatus] = useState(
		initialTask.taskStatus ? initialTask.taskStatus : "To do"
	);

	// Sync state with initialTask when it changes
	useEffect(() => {
		if (initialTask) {
			setTaskTitle(initialTask.taskTitle || "");
			setTaskDescription(initialTask.taskDescription || "");
			setTaskPriority(initialTask.taskPriority || "3");
			setTaskDeadline(initialTask.taskDeadline || "");
			setTaskStatus(initialTask.taskStatus || "To do");
		}
	}, [initialTask]);

	const handleClose = () => {
		setIsFormOpen(false)
		if (initialTask.id === false) {
			resetForm();
		}
	}

	const resetForm = () => {
		setTaskTitle("");
		setTaskDescription("");
		setTaskPriority("3");
		setTaskDeadline("");
		setTaskStatus("To do");
	};

	const handleSubmit = (event) => {
		event.preventDefault(); //precentDefault() what is its purpose as it it did not get shown as an option by intellij?
		const updatedData = { taskTitle, taskDescription, taskPriority, taskDeadline, taskStatus }
		if (initialTask.id) {
			onSubmit({ ...initialTask, ...updatedData }) //Merge with initial Task to keep the id for updates
		} else {
			onSubmit(updatedData)
		}
		setIsFormOpen(false)
		if (initialTask.id === false) {
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
				<Title value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
				<Description
					value={taskDescription}
					onChange={(e) => setTaskDescription(e.target.value)}
				/>
				<Priority
					value={taskPriority}
					onChange={(e) => setTaskPriority(e.target.value)}
				/>
				<Deadline
					value={taskDeadline}
					onChange={(e) => setTaskDeadline(e.target.value)}
				/>
				<Status
					value={taskStatus}
					onChange={(e) => setTaskStatus(e.target.value)}
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
