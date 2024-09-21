import React from "react";
import TextField from "@mui/material/TextField";

interface TitleProps {
	title: string; // deadline is a string in the format 'YYYY-MM-DD'
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Title: React.FC<TitleProps> = ({ title, onChange }) => {
	return (
		<TextField
			label="Title"
			type="text"
			autoFocus
			margin="dense"
			fullWidth
			value={title}
			onChange={onChange}
		/>
	);
};

export default Title;
