import React from "react";
import TaskColumn from "./TaskColumn";
import PendingIcon from '@mui/icons-material/Pending';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Task } from "./types"; // Import the unified Task type

interface FilteredTaskListProps {
    tasks: Task[];
    onDelete: (task: Task) => void;
    onEdit: (task: Task) => void;
}

const FilteredTaskList: React.FC<FilteredTaskListProps> = ({ tasks, onDelete, onEdit }) => {
    const toDoTasks = tasks.filter((task) => task.taskStatus === "To do");
    const inProgressTasks = tasks.filter((task) => task.taskStatus === "Progress");
    const completedTasks = tasks.filter((task) => task.taskStatus === "Completed");

    return (
        <section className="taskContainer" style={{ fontFamily: "Arial" }}>
            <TaskColumn
                title="To Do"
                icon={<PendingIcon />}
                tasks={toDoTasks}
                onDelete={onDelete}
                onEdit={onEdit}
            />
            <TaskColumn
                title="In Progress"
                icon={<HourglassBottomIcon />}
                tasks={inProgressTasks}
                onDelete={onDelete}
                onEdit={onEdit}
            />
            <TaskColumn
                title="Completed"
                icon={<CheckCircleIcon />}
                tasks={completedTasks}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        </section>
    );
};

export default FilteredTaskList;
