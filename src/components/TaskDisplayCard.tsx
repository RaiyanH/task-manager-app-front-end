import React from "react";
import { Card, CardContent, Typography, IconButton, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Task } from "./types";

interface TaskDisplayCardProps {
	task: Task;
	onDelete: () => void;
	onEdit: () => void;
}

const TaskDisplayCard: React.FC<TaskDisplayCardProps> = ({ task, onDelete, onEdit }) => {

	const placeholder = task.taskTitle ? task.taskTitle : "\u200B";
	const twoLine = task.taskDescription?.slice(0, task.taskDescription.indexOf("\n"));

	return (
		<Card
			sx={{
				marginBottom: "20px",
				display: "flex",
				flexDirection: "column",
				minWidth: "70px",
				backgroundColor: "white",
				borderRadius: "5px",
				"&:hover": {
					backgroundColor: "#dcdcdc",
				},
			}}
		>
			<CardContent style={{ flex: 1, overflow: "hidden" }}>
				<Typography variant="h6" component="div" noWrap p={1}>
					{placeholder}
				</Typography>
				<Typography variant="body2" color="text.secondary" noWrap p={1}>
					{task.taskDescription?.length > 0 ? (task.taskDescription.length > 2 ? `${twoLine}...` : twoLine) : 'No Description Provided'}
				</Typography>
				<Chip label={`Status: ${task.taskStatus}`} color="default" style={{ margin: '4px' }} />
				<Chip label={`Priority: ${task.taskPriority}`} color="primary" style={{ margin: '4px' }} />
				<Chip label={`Deadline: ${task.taskDeadline}`} color="secondary" style={{ margin: '4px' }} />
			</CardContent>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "4px" }} >
				<IconButton onClick={onDelete} aria-label="delete" sx={{ color: "#e91e63", p: 1 }}>
					<DeleteIcon />
				</IconButton>
				<IconButton onClick={onEdit} aria-label="edit" sx={{ color: "#009688", p: 1 }}>
					<EditIcon />
				</IconButton>
			</div>
		</Card>
	);
};

export default TaskDisplayCard;
