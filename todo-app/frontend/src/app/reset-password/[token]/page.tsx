'use client';
import { UserInputForm } from "../../../Authentication/component/UserInputForm";
import { Button } from "../../../components/ui/Button";
import { Logo } from "../../../Authentication/component/Logo";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { resetPassword } from "../../../Authentication/services";
import Link from 'next/link';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const params = useParams();
    const token = params.token as string;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');
        try {
            const res = await resetPassword(token, password);
            if (res.success) {
                setMessage('Password reset successful! Redirecting to login...');
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setError(res.message || 'Reset failed. Token might be invalid or expired.');
            }
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
                    <h2 className="mt-6 text-2xl font-bold text-gray-900">New Password</h2>
                    <p className="mt-2 text-sm text-gray-600">Enter your new password below</p>
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
                        label="New Password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <UserInputForm
                        label="Confirm New Password"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={loading}
                    >
                        Reset Password
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
