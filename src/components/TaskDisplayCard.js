import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TaskDisplayCard = ({ task, onDelete, onEdit }) => {
	const placeholder = task.title ? task.title : "\u200B";

  const twoLine = task.description?.slice(0, task.description.indexOf("\n"));

	return (
		<Card
			style={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				minWidth: "200px",
				width: "100%",
          backgroundColor: "white",
  '&:hover': {
    backgroundColor: "#e91e63",
  },
			}}
		>
			<CardContent style={{ flex: 1, overflow: "hidden" }}>
				<Typography variant="h6" component="div" noWrap p={1}>
					{placeholder}
				</Typography>
				<Typography variant="body2" color="text.secondary" noWrap p={1}>
					{task.description?.length > 0 ? (task.description.length > 2 ? `${twoLine}...` : twoLine) : 'No Description Provided'}
				</Typography>
				<Typography variant="body3" color="text.secondary" noWrap p={1}>
					Priority: {task.priority}
				</Typography>
				<Typography variant="body3" color="text.secondary" noWrap p={1}>
					Deadline: {task.deadline}
				</Typography>
        <Typography variant="body3" color="text.secondary" noWrap p={1}>
					Status: {task.status}
				</Typography>
			</CardContent>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "8px",
				}}
			>
				<IconButton onClick={onDelete} aria-label="delete" p={1} sx={{color:"#e91e63"}}>
					<DeleteIcon />
				</IconButton>
				<IconButton onClick={onEdit} aria-label="edit" p={1} sx={{color:"#009688"}}>
					<EditIcon />
				</IconButton>
			</div>
		</Card>
	);
};

export default TaskDisplayCard;
