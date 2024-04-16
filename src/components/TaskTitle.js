import React from "react";
import TextField from "@mui/material/TextField";

const TaskTitle = ({ value, onChange }) => {
	return <TextField label="Title" value={value} onChange={onChange} />;
};

export default TaskTitle;
