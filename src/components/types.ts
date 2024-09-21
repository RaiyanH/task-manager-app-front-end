// types.ts

export interface Task {
    id?: number | null;
    taskTitle: string;
    taskDescription: string;
    taskPriority: string;
    taskDeadline: string;
    taskStatus: string;
}
