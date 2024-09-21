import React, { useState } from "react";
import TextField from "@mui/material/TextField";

interface Deadline {
	deadline: string; // Assuming deadline is a string in the format 'YYYY-MM-DD'
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle change
}

const Deadline: React.FC<Deadline> = ({ deadline, onChange }) => {
	// The following hook and two functions are there to fix the overlapping style issue in Deadline.

	const [showFormat, setShowFormat] = useState(false);

	const handleFocus = () => {
		setShowFormat(true);
	};

	const handleBlur = () => {
		setShowFormat(false);
	};

	return (
		<TextField
			label="Deadline"
			margin="dense"
			type="date"
			fullWidth
			sx={{
				"& .MuiInputBase-input": {
					// Style the input field
					color: showFormat ? "black" : "transparent", // Transparent color when not focused
					transition: "color 0.2s ease-in-out",
				},
			}}
			onFocus={handleFocus}
			onBlur={handleBlur}
			placeholder="Deadline" // Set placeholder for out-of-focus state
			value={deadline}
			onChange={onChange}
		/>
	);
};

export default Deadline;
