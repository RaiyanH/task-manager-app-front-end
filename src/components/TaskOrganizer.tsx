import React from 'react';
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface TaskOrganizerProps {
    value: string;
    onChange: (event: SelectChangeEvent) => void;
    onClick: () => void;
}

const TaskOrganizer: React.FC<TaskOrganizerProps> = ({ value, onChange, onClick }) => {

    return (
        <section
            style={{
                backgroundColor: "#F05454",
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "5px",
                flexWrap: "wrap",
                marginTop: "20px",
            }}
        >
            <Select
                value={value}
                onChange={onChange}
                sx={{
                    "& .MuiSelect-icon": { color: "white" },
                    '.MuiOutlinedInput-notchedOutline': { border: 0 },
                    color: "white",
                    marginRight: "10px",
                    fontSize: "16px"
                }}
            >
                <MenuItem value="all">All Tasks</MenuItem>
                <MenuItem value="To do">To Do</MenuItem>
                <MenuItem value="Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
            </Select>
            <Button
                size="large"
                style={{
                    textTransform: "none",
                    color: "white",
                    fontSize: "16px",
                    paddingRight: "20px",
                    gap: "10px"
                }}
                aria-label="add"
                onClick={onClick}
            >
                <AddCircleIcon />Add Task
            </Button>
        </section>
    )

}

export default TaskOrganizer;