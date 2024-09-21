import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface PriorityProps {
	priority: string;
	onChange: (event: SelectChangeEvent) => void;
}

const Priority: React.FC<PriorityProps> = ({ priority, onChange }) => {
	console.log("Current priority:", priority);

	return (
		<FormControl fullWidth margin="dense">
			<InputLabel id="priority-label">Priority</InputLabel>
			<Select
				label="priority-label"
				value={priority}
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
