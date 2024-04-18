import React from "react";
import TextField from "@mui/material/TextField";

const Title = ({value, onChange}) => {
	return (
		<TextField
			label="Title"
			type="text"
			autoFocus
			margin="dense"
			fullWidth
			value={value}
			onChange={onChange}
		/>
	);
};

export default Title;
