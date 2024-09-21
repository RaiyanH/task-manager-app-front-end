import React from "react";
import TaskDisplayCard from "./TaskDisplayCard";
import { Task } from "./types";

interface TaskColumnProps {
    title: string;
    icon: React.ReactNode;
    tasks: Task[];
    onDelete: (task: Task) => void;
    onEdit: (task: Task) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, icon, tasks, onDelete, onEdit }) => {
    return (
        <section className="taskColumn">
            <h4
                style={{
                    backgroundColor: "#222831",
                    borderRadius: "5px",
                    padding: "10px 0 10px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                {icon} {title}
            </h4>
            {tasks.map((task) => (
                <article key={task.id}>
                    <TaskDisplayCard task={task} onDelete={() => onDelete(task)} onEdit={() => onEdit(task)} />
                </article>
            ))}
        </section>
    );
};

export default TaskColumn;
