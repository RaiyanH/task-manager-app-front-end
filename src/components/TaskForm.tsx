import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	Button,
	SelectChangeEvent,
} from "@mui/material";
import Title from "./Title";
import Description from "./Description";
import Priority from "./Priority";
import Deadline from "./Deadline";
import Status from "./Status";
import { Task } from "./types";

interface TaskFormProps {
	initialTask: Task;
	onSubmit: (task: Task) => void;
	isFormOpen: boolean;
	setIsFormOpen: (open: boolean) => void;
}

const defaultTask: Task = {
	taskTitle: "",
	taskDescription: "",
	taskPriority: "3",
	taskDeadline: "",
	taskStatus: "To do",
};

const TaskForm: React.FC<TaskFormProps> = ({ initialTask = defaultTask, onSubmit, isFormOpen, setIsFormOpen }) => {
	const [taskTitle, setTaskTitle] = useState(initialTask.taskTitle);
	const [taskDescription, setTaskDescription] = useState(initialTask.taskDescription);
	const [taskPriority, setTaskPriority] = useState(initialTask.taskPriority);
	const [taskDeadline, setTaskDeadline] = useState(initialTask.taskDeadline);
	const [taskStatus, setTaskStatus] = useState(initialTask.taskStatus);

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
		if (initialTask.id === null) { /*possibly change to undefine*/
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

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); //precentDefault() what is its purpose as it it did not get shown as an option by intellij?
		const updatedData = { taskTitle, taskDescription, taskPriority, taskDeadline, taskStatus }
		if (initialTask.id) {
			onSubmit({ ...initialTask, ...updatedData }) //Merge with initial Task to keep the id for updates
		} else {
			onSubmit(updatedData);
		}
		setIsFormOpen(false)
		if (initialTask.id === null) {
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
				<form onSubmit={handleSubmit}>


					<Title title={taskTitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskTitle(e.target.value)} />
					<Description
						description={taskDescription}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskDescription(e.target.value)}
					/>
					<Priority
						priority={taskPriority}
						onChange={(e: SelectChangeEvent) => setTaskPriority(e.target.value)}
					/>
					<Deadline
						deadline={taskDeadline}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskDeadline(e.target.value)}
					/>
					<Status
						status={taskStatus}
						onChange={(e: SelectChangeEvent) => setTaskStatus(e.target.value)}
					/>

					<DialogActions>
						<Button onClick={handleClose} sx={{ color: "#e91e63" }}>
							Cancel
						</Button>
						<Button type="submit" sx={{ color: "#009688" }}>
							Submit
						</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default TaskForm;
