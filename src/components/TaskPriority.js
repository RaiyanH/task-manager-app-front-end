import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const TaskPriority = ({ priority, handlePriorityChange }) => {
	console.log("Current priority:", priority);

	return (
		<FormControl sx={{ width: "25%" }}>
			<InputLabel htmlFor="priority">Priority</InputLabel>
			<Select
				id="priority"
				value={priority}
				onChange={handlePriorityChange}
				label="Priority"
			>
				<MenuItem value="1">1</MenuItem>
				<MenuItem value="2">2</MenuItem>
				<MenuItem value="3">3</MenuItem>
				<MenuItem value="4">4</MenuItem>
				<MenuItem value="5">5</MenuItem>
			</Select>
		</FormControl>
	);
};

export default TaskPriority;
