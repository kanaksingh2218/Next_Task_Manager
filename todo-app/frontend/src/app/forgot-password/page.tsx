'use client';
import { UserInputForm } from "../../Authentication/component/UserInputForm";
import { Button } from "../../components/ui/Button";
import { Logo } from "../../Authentication/component/Logo";
import Link from 'next/link';
import { useState } from "react";
import { forgotPassword } from "../../Authentication/services";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await forgotPassword(email);
            setMessage('If an account exists with this email, you will receive a password reset link.');
        } catch (err: any) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
                <div className="flex flex-col items-center">
                    <Logo />
                    <h2 className="mt-6 text-2xl font-bold text-gray-900">Reset Password</h2>
                    <p className="mt-2 text-sm text-gray-600">Enter your email to receive instructions</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {message && (
                        <div className="p-3 text-sm text-green-700 bg-green-50 rounded-lg">
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                            {error}
                        </div>
                    )}

                    <UserInputForm
                        label="Email Address"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={loading}
                    >
                        Send Reset Link
                    </Button>
                </form>

                <div className="text-center text-sm text-gray-600">
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
