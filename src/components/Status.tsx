import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface StatusProps {
	status: string;
	onChange: (event: SelectChangeEvent) => void;
}

const Status: React.FC<StatusProps> = ({ status, onChange }) => {
	console.log("Current priority:", status);

	return (
		<FormControl fullWidth margin="dense">
			<InputLabel id="catagory-label">Status</InputLabel>
			<Select
				label="catagory-label"
				value={status}
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
