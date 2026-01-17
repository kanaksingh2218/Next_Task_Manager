export interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    userId: string;
    categoryId: {
        _id: string;
        name: string;
        color: string;
    } | string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskData {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    categoryId?: string;
}
