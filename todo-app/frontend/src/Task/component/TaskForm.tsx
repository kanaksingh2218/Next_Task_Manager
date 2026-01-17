import React, { useState, useEffect } from 'react';
import { useTask } from '../../context/TaskContext';
import { Task, CreateTaskData } from '../model/Task.model';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface TaskFormProps {
    task?: Task | null;
    onSuccess: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess }) => {
    const { createTask, updateTask, categories } = useTask();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<CreateTaskData>({
        title: '',
        description: '',
        priority: 'low',
        dueDate: '',
        categoryId: ''
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description || '',
                priority: task.priority,
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
                categoryId: typeof task.categoryId === 'object' ? task.categoryId._id : task.categoryId || ''
            });
        }
    }, [task]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (task) {
                await updateTask(task._id, formData);
            } else {
                await createTask(formData);
            }
            onSuccess();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Description</label>
                <textarea
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Category</label>
                    <select
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    >
                        <option value="">No Category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Priority</label>
                    <select
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Due Date</label>
                <input
                    type="date"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
            </div>

            <Button type="submit" isLoading={loading} className="w-full">
                {task ? 'Update Task' : 'Create Task'}
            </Button>
        </form>
    );
};
