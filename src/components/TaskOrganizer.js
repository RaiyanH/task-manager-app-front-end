import React from 'react';
import { Button, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TaskOrganizer = ({ value, onChange, onClick }) => {

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
                    color: "white",
                    fontSize: "16px",
                    textTransform: "none",
                    paddingRight: "20px",
                }}
                aria-label="add"
                onClick={onClick}
            >
                <AddIcon /> Add Task
            </Button>
        </section>
    )

}

export default TaskOrganizer;