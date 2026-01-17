'use client';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserInputForm } from './UserInputForm';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import { Logo } from './Logo';

export const LoginForm = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(formData);
        } catch (err: any) {
            setError(err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
            <div className="flex flex-col items-center">
                <Logo />
                <h2 className="mt-6 text-2xl font-bold text-black">Welcome back</h2>
                <p className="mt-2 text-sm text-gray-700">Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                        {error}
                    </div>
                )}

                <UserInputForm
                    label="Email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <UserInputForm
                    label="Password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />

                <div className="flex items-center justify-end">
                    <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={loading}
                >
                    Log In
                </Button>
            </form>

            <div className="text-center text-sm text-gray-700">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign up
                </Link>
            </div>
        </div>
    );
};
