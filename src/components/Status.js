import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Status = ({ value, onChange }) => {
	console.log("Current priority:", value);

	return (
		<FormControl fullWidth margin="dense">
			<InputLabel label="catagory-label">Status</InputLabel>
			<Select
				label="catagory-label"
				value={value}
				onChange={onChange}
			>
				<MenuItem value="To do">To do</MenuItem>
				<MenuItem value="Progress">Progress</MenuItem>
				<MenuItem value="Completed">Completed</MenuItem>
			</Select>
		</FormControl>
	);
};

export default Status;
