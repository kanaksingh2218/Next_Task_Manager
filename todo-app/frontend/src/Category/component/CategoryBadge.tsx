import React from 'react';

interface CategoryBadgeProps {
    name: string;
    color: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ name, color }) => {
    return (
        <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${color}20`, color: color }}
        >
            <span className="w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: color }}></span>
            {name}
        </span>
    );
};
