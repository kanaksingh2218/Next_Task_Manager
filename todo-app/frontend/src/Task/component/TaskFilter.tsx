import React from 'react';

interface TaskFilterProps {
    filter: 'all' | 'active' | 'completed';
    setFilter: (filter: 'all' | 'active' | 'completed') => void;
    search: string;
    setSearch: (search: string) => void;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
    filter,
    setFilter,
    search,
    setSearch
}) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <div className="flex bg-gray-100 p-1 rounded-lg">
                {(['all', 'active', 'completed'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all
              ${filter === f ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-gray-800'}
            `}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <div className="w-full md:w-64">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
        </div>
    );
};
