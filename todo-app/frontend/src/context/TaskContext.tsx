'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import * as taskService from '../Task/services';
import * as categoryService from '../Category/services';

interface TaskContextType {
    tasks: any[];
    categories: any[];
    loading: boolean;
    getTasks: (filters?: any) => Promise<void>;
    createTask: (data: any) => Promise<void>;
    updateTask: (id: string, data: any) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    toggleComplete: (id: string) => Promise<void>;
    getCategories: () => Promise<void>;
    createCategory: (data: any) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const getTasks = async (filters: any = {}) => {
        setLoading(true);
        try {
            const res = await taskService.getTasks(filters);
            if (res.success) {
                setTasks(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (data: any) => {
        try {
            const res = await taskService.createTask(data);
            if (res.success) {
                setTasks([res.data, ...tasks]);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const updateTask = async (id: string, data: any) => {
        try {
            const res = await taskService.updateTask(id, data);
            if (res.success) {
                setTasks(tasks.map(task => task._id === id ? res.data : task));
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await taskService.deleteTask(id);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const toggleComplete = async (id: string) => {
        try {
            const res = await taskService.toggleComplete(id);
            if (res.success) {
                setTasks(tasks.map(task => task._id === id ? res.data : task));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getCategories = async () => {
        try {
            const res = await categoryService.getCategories();
            if (res.success) {
                setCategories(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const createCategory = async (data: any) => {
        try {
            const res = await categoryService.createCategory(data);
            if (res.success) {
                setCategories([...categories, res.data]);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const deleteCategory = async (id: string) => {
        try {
            await categoryService.deleteCategory(id);
            setCategories(categories.filter(cat => cat._id !== id));
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            categories,
            loading,
            getTasks,
            createTask,
            updateTask,
            deleteTask,
            toggleComplete,
            getCategories,
            createCategory,
            deleteCategory
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => useContext(TaskContext);
