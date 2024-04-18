import React from "react";
import TextField from "@mui/material/TextField";

const Description = ({ value, onChange }) => {
	return (
		<TextField
			label="Description"
			margin="dense"
			multiline
			rows={4}
			fullWidth
			value={value}
			onChange={onChange}
		/>
	);
};

export default Description;
