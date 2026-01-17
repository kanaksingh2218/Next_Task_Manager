'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import * as authService from '../Authentication/services';
import { User, LoginData, SignupData } from '../Authentication/model/User.model';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loadUser = async () => {
            const token = authService.getToken();
            if (token) {
                try {
                    const res = await authService.getMe();
                    if (res.success) {
                        setUser(res.data);
                        setIsAuthenticated(true);
                    } else {
                        // Token invalid
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        setUser(null);
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error('Failed to load user', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (data: LoginData) => {
        try {
            const res = await authService.login(data);
            console.log('AuthContext Login Response:', res); // LOGGING
            if (res.success) {
                const userObj = {
                    _id: res._id,
                    name: res.name,
                    email: res.email
                };
                console.log('Saving User to LocalStorage:', userObj); // LOGGING

                localStorage.setItem('token', res.token);
                localStorage.setItem('user', JSON.stringify(userObj));
                setUser(userObj);
                setIsAuthenticated(true);
                router.push('/dashboard');
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const signup = async (data: SignupData) => {
        try {
            const res = await authService.signup(data);
            if (res.success) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', JSON.stringify({
                    _id: res._id,
                    name: res.name,
                    email: res.email
                }));
                setUser({
                    _id: res._id,
                    name: res.name,
                    email: res.email
                });
                setIsAuthenticated(true);
                router.push('/dashboard');
            } else {
                throw new Error(res.message);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
