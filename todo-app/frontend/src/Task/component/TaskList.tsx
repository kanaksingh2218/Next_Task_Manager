import React, { useEffect, useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { TaskItem } from './TaskItem';
import { TaskFilter } from './TaskFilter';
import { TaskForm } from './TaskForm';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Task } from '../model/Task.model';

export const TaskList = () => {
    const { tasks, getTasks, loading } = useTask();
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        getTasks();
    }, []);

    const filteredTasks = tasks.filter(task => {
        const matchesFilter =
            filter === 'all' ? true :
                filter === 'active' ? !task.completed :
                    filter === 'completed' ? task.completed : true;

        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    return (
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6 min-h-[500px]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-black">My Tasks</h1>
                    <p className="text-gray-600 text-sm mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>+ New Task</Button>
            </div>

            <TaskFilter
                filter={filter}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
            />

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-10">Done</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Task</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Priority</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Due Date</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500">Loading tasks...</td>
                            </tr>
                        ) : filteredTasks.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500">
                                    <div className="flex flex-col items-center">
                                        <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        <p>No tasks found</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredTasks.map(task => (
                                <TaskItem key={task._id} task={task} onEdit={handleEdit} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingTask ? 'Edit Task' : 'New Task'}
            >
                <TaskForm
                    task={editingTask}
                    onSuccess={() => {
                        handleCloseModal();
                        getTasks();
                    }}
                />
            </Modal>
        </div>
    );
};
