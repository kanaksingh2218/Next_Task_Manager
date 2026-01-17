import React from 'react';
import { Task } from '../model/Task.model';
import { useTask } from '../../context/TaskContext';
import { CategoryBadge } from '../../Category/component/CategoryBadge';

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
    const { toggleComplete, deleteTask } = useTask();

    const priorityColors = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800'
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task._id)}
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
            </td>
            <td className="px-6 py-4">
                <div className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-black'}`}>
                    {task.title}
                </div>
                {task.description && (
                    <div className={`text-xs ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                        {task.description.length > 50 ? task.description.substring(0, 50) + '...' : task.description}
                    </div>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {typeof task.categoryId === 'object' && task.categoryId !== null ? (
                    <CategoryBadge name={task.categoryId.name} color={task.categoryId.color} />
                ) : (
                    <span className="text-gray-500 text-xs">-</span>
                )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityColors[task.priority]}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    onClick={() => onEdit(task)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                >
                    Edit
                </button>
                <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-600 hover:text-red-900"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};
