import React, { useState } from "react";
import TaskTitle from "./TaskTitle";
import TaskDescription from "./TaskDescription";
import TaskPriority from "./TaskPriority";
import TaskDeadline from "./TaskDeadline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import CancelButtons from "./CancelButtons";
import SaveButtons from "./SaveButtons";

const TaskFormUpdate = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState(5); // Default priority value
	const [selectedTime, setSelectedTime] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		// Create a task object with form data
		const task = { title, description, priority, selectedTime };
		console.log(task);
		fetch("http://localhost:8080/createTask", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(task),
		}).then(() => {
			console.log("New Task Created");
		});
	};

	return (
		<Paper elevation={6} sx={{ width: "100%", maxWidth: 400, padding: "30px" }}>
			<Box>
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
								value={selectedTime}
								handleTimeChange={(e) => setSelectedTime(e.target.value)}
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
								onClick={handleSubmit}
								sx={{ width: "40%" }}
							></CancelButtons>
						</Box>
					</Box>
				</form>
			</Box>
		</Paper>
	);
};

export default TaskFormUpdate;
