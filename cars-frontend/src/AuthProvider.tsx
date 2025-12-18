import React, { useState, useMemo, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthContext, type User } from './AuthContext';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => {
        try {
            return localStorage.getItem('token');
        } catch {
            console.warn('Failed to read token from localStorage');
            return null;
        }
    });
    const [user, setUserState] = useState<User | null>(null);

    useEffect(() => {
        if (token) {
            const fetchUser = async () => {
                try {
                    const response = await fetch('http://localhost:5000/api/account/', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUserState(userData);
                    } else if (response.status === 401) {
                        setToken(null);
                        localStorage.removeItem('token');
                    }
                } catch (error) {
                    console.error('Error fetching user data on app start:', error);
                }
            };

            fetchUser();
        }
    }, [token]);

    const login = useCallback((newToken: string) => {
        try {
            setToken(newToken);
            localStorage.setItem('token', newToken);
        } catch (error) {
            console.error('Failed to save token to localStorage:', error);
        }
    }, []);

    const logout = useCallback(() => {
        try {
            setToken(null);
            setUserState(null);
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Failed to remove token from localStorage:', error);
        }
    }, []);

    const setUser = useCallback((user: User | null) => {
        setUserState(user);
    }, []);

    const value = useMemo(() => ({ token, user, login, logout, setUser }), [token, user, login, logout, setUser]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};