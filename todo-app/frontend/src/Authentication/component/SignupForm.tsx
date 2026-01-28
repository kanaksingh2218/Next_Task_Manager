'use client';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserInputForm } from './UserInputForm';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import { Logo } from './Logo';

export const SignupForm = () => {
    const { signup, loading: authLoading } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await signup({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password
            });
        } catch (err: any) {
            console.error('Signup Error:', err);
            setError(err.response?.data?.message || err.message || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
            <div className="flex flex-col items-center">
                <Logo />
                <h2 className="mt-6 text-2xl font-bold text-black">Create an account</h2>
                <p className="mt-2 text-sm text-gray-700">Start organizing your life today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                        {error}
                    </div>
                )}


                <UserInputForm
                    label="Full Name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />

                <UserInputForm
                    label="Email Address"
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

                <UserInputForm
                    label="Confirm Password"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />

                <Button
                    type="submit"
                    className="w-full"
                    isLoading={loading}
                >
                    Sign Up
                </Button>
            </form>

            <div className="text-center text-sm text-gray-700">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Log in
                </Link>
            </div>
        </div>
    );
};
