'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User, authApi } from './api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
    register: (username: string, email: string, password: string, rememberMe: boolean) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';

interface JWTPayload {
    id: string;
    email: string;
    username: string;
    role: string;
    balance: number;
    exp: number;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const decodeToken = (token: string): User | null => {
        try {
            const decoded = jwtDecode<JWTPayload>(token);
            // Check if token is expired
            if (decoded.exp * 1000 < Date.now()) {
                return null;
            }
            return {
                id: decoded.id,
                email: decoded.email,
                username: decoded.username,
                role: decoded.role,
                balance: decoded.balance
            };
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    // Load user data from token on mount
    useEffect(() => {
        const savedToken = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
        
        if (savedToken) {
            const decodedUser = decodeToken(savedToken);
            if (decodedUser) {
                setToken(savedToken);
                setUser(decodedUser);
                // Verify token validity with backend
                authApi.getMe(savedToken)
                    .then(response => {
                        if (!response.success) {
                            handleLogout();
                        }
                    })
                    .catch(handleLogout);
            } else {
                handleLogout();
            }
        }
        setLoading(false);
    }, []);

    // Prefetch common routes
    useEffect(() => {
        if (user) {
            router.prefetch('/dashboard');
        } else {
            router.prefetch('/auth/login');
            router.prefetch('/auth/register');
        }
    }, [user, router]);

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
        Cookies.remove(TOKEN_KEY);
        router.push('/auth/login');
    };

    const saveAuthData = (tokenData: string, rememberMe: boolean) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(TOKEN_KEY, tokenData);
        
        const decodedUser = decodeToken(tokenData);
        if (!decodedUser) {
            throw new Error('Invalid token received');
        }

        // Set cookie for middleware
        Cookies.set(TOKEN_KEY, tokenData, {
            expires: rememberMe ? 30 : undefined, // 30 days if remember me, session cookie otherwise
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });
        
        setUser(decodedUser);
        setToken(tokenData);
    };

    const register = async (username: string, email: string, password: string, rememberMe: boolean = true) => {
        const response = await authApi.register({ username, email, password });
        
        if (response.success) {
            saveAuthData(response.token, rememberMe);
            router.prefetch('/dashboard');
            router.push('/dashboard');
        } else {
            throw new Error(response.error);
        }
    };

    const login = async (email: string, password: string, rememberMe: boolean = true) => {
        const response = await authApi.login({ email, password });
        if (response.success) {
            saveAuthData(response.token, rememberMe);
            router.prefetch('/dashboard');
            router.push('/dashboard');
        } else {
            throw new Error(response.error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout: handleLogout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 