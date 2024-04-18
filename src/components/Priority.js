import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Priority = ({ value, onChange }) => {
	console.log("Current priority:", value);

	return (
		<FormControl fullWidth margin="dense">
			<InputLabel label="priority-label">Priority</InputLabel>
			<Select
				label="priority-label"
				value={value}
				onChange={onChange}
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

export default Priority;
