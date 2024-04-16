import React from "react";
import TextField from "@mui/material/TextField";

const TaskDescription = ({ value, onChange }) => {
	return (
		<TextField
			label="Description"
			multiline
			rows={4}
			value={value}
			onChange={onChange}
		/>
	);
};

export default TaskDescription;
