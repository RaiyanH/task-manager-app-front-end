import React, { useState } from "react";
import TaskTitle from "./TaskTitle";
import TaskDescription from "./TaskDescription";
import TaskPriority from "./TaskPriority";
import TaskDeadline from "./TaskDeadline";
import CancelButtons from "./CancelButtons";
import SaveButtons from "./SaveButtons";
import { Dialog, DialogTitle, DialogContent, TextField, Box } from "@mui/material";

const TaskFormCreate = ({initialTask, onSubmit, isFormOpen, setIsFormOpen}) => {
	const [title, setTitle] = useState(initialTask.title ? initialTask.title : "");
	const [description, setDescription] = useState(initialTask.description ? initialTask.description : "");
	const [priority, setPriority] = useState(initialTask.priority ? initialTask.priority : 5); // Default priority value
	const [deadline, setDeadline] = useState(initialTask.deadline ? initialTask.deadline : "");

	const handleClose = () => {
		onSubmit({ title: "", description: "", priority: 5 , deadline: "" }); // Reset form on close
		setIsFormOpen(false); // Update state in TaskManager to close the form
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Create a task object with form data
		//const task = { title, description, priority, deadline };
		//console.log(task);
		onSubmit({ title, description, priority, deadline });
		/*fetch("http://localhost:9090/createTask", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(task),
		}).then(() => {
			console.log("New Task Created");
		});*/
	};

	return (
		<Dialog open={isFormOpen} onClose={handleClose} elevation={6} /*sx={{ width: "100%", maxWidth: 400, padding: "30px" }}*/>
			<DialogTitle>
				{Object.keys(initialTask).length > 0 ? 'Update Task' : 'Add Task'}
			</DialogTitle>
			<DialogContent padding="5px">
				<form onSubmit={handleSubmit}>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<TaskTitle
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<TaskDescription
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<Box sx={{ display: "flex", gap: 1 }}>
							<TaskPriority
								priority={priority}
								handlePriorityChange={(e) => setPriority(e.target.value)}
							/>
							<TaskDeadline
								value={deadline}
								handleTimeChange={(e) => setDeadline(e.target.value)}
							/>
						</Box>
						<TextField label="Assigned To" />
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								gap: 1,
								paddingTop: "40px",
							}}
						>
							<SaveButtons
								onClick={handleSubmit}
								sx={{ width: "40%" }}
							></SaveButtons>
							<CancelButtons
								onClick={handleClose}
								sx={{ width: "40%" }}
							></CancelButtons>
						</Box>
					</Box>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default TaskFormCreate;
