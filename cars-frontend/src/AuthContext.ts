import { createContext } from 'react';

export interface User {
    id: string;
    email: string;
    displayName: string;
    userName: string;
    bio: string;
}

export interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (newToken: string) => void;
    logout: () => void;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
