import React, { useEffect, useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { Modal } from '../../components/ui/Modal';
import { CategoryForm } from './CategoryForm';
import { Button } from '../../components/ui/Button';

export const CategoryList = () => {
    const { categories, getCategories, deleteCategory } = useTask();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 w-full md:w-64 flex-shrink-0 h-fit">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-black">Categories</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                    + Add
                </button>
            </div>

            <div className="space-y-2">
                <div
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                >
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                        <span className="text-sm text-gray-800">All Tasks</span>
                    </div>
                </div>

                {categories.map((category) => (
                    <div
                        key={category._id}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 group"
                    >
                        <div className="flex items-center gap-2 cursor-pointer">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: category.color }}
                            ></span>
                            <span className="text-sm text-gray-800">{category.name}</span>
                        </div>
                        <button
                            onClick={() => deleteCategory(category._id)}
                            className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition-opacity"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="New Category"
            >
                <CategoryForm onSuccess={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};
