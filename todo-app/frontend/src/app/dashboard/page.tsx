'use client';
import { TaskList } from "../../Task/component/TaskList";
import { CategoryList } from "../../Category/component/CategoryList";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../../Authentication/component/Logo";

export default function DashboardPage() {
    const { user, loading, logout, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [loading, isAuthenticated, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <Logo />
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-800">Hello, <b>{user.name}</b></span>
                        <button
                            onClick={logout}
                            className="text-sm font-medium text-gray-600 hover:text-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <CategoryList />
                    <TaskList />
                </div>
            </main>
        </div>
    );
}
