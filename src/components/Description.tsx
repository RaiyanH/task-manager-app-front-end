import React from "react";
import TextField from "@mui/material/TextField";

interface DescriptionProps {
	description: string; // Assuming deadline is a string in the format 'YYYY-MM-DD'
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle change
}

const Description: React.FC<DescriptionProps> = ({ description, onChange }) => {
	return (
		<TextField
			label="Description"
			margin="dense"
			multiline
			rows={4}
			fullWidth
			value={description}
			onChange={onChange}
		/>
	);
};

export default Description;
