import React from 'react';
import { Input } from '../../components/ui/Input';

interface UserInputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    register?: any; // Hook form register
}

export const UserInputForm = React.forwardRef<HTMLInputElement, UserInputFormProps>(
    ({ label, error, register, ...props }, ref) => {
        return (
            <Input
                label={label}
                error={error}
                ref={ref}
                {...register}
                {...props}
            />
        );
    }
);

UserInputForm.displayName = 'UserInputForm';
