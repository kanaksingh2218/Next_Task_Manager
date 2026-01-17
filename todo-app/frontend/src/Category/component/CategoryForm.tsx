import React, { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface CategoryFormProps {
    onSuccess?: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ onSuccess }) => {
    const { createCategory } = useTask();
    const [name, setName] = useState('');
    const [color, setColor] = useState('#3B82F6'); // Default blue
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createCategory({ name, color });
            setName('');
            setColor('#3B82F6');
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Work"
            />

            <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">Color</label>
                <div className="flex items-center gap-2">
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                    />
                    <span className="text-sm text-gray-800">{color}</span>
                </div>
            </div>

            <Button type="submit" isLoading={loading} className="w-full">
                Create Category
            </Button>
        </form>
    );
};
