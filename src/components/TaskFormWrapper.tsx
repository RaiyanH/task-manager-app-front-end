import React from "react";
import TaskForm from "./TaskForm";
import { Task } from "./types"; // Import the unified Task type

interface TaskFormWrapperProps {
    selectedTask: Task | null;
    isFormOpen: boolean;
    setIsFormOpen: (open: boolean) => void;
    handleAddTask: (task: Task) => void;
    handleEditTask: (task: Task) => void;
}

// Default task values for new task creation
const defaultTask: Task = {
    taskTitle: "",
    taskDescription: "",
    taskPriority: "3",
    taskDeadline: "",
    taskStatus: "To do",
};

const TaskFormWrapper: React.FC<TaskFormWrapperProps> = ({
    selectedTask,
    isFormOpen,
    setIsFormOpen,
    handleAddTask,
    handleEditTask,
}) => {
    return isFormOpen ? (
        <TaskForm
            initialTask={selectedTask || defaultTask} // Use defaultTask if selectedTask is null
            onSubmit={selectedTask ? handleEditTask : handleAddTask}
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
        />
    ) : null;
};

export default TaskFormWrapper;
