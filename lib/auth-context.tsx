'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useMutation, useQuery } from '@apollo/client';
import { REGISTER_MUTATION, LOGIN_MUTATION, LOGOUT_MUTATION, ME_QUERY } from './graphql/auth';

const TOKEN_KEY = 'auth_token';

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    balance: number;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
    register: (username: string, email: string, password: string, rememberMe: boolean) => Promise<void>;
    logout: () => void;
    loading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface JWTPayload {
    id: string;
    email: string;
    username: string;
    role: string;
    balance: number;
    exp: number;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const [loginMutation] = useMutation(LOGIN_MUTATION);
    const [registerMutation] = useMutation(REGISTER_MUTATION);
    const [logoutMutation] = useMutation(LOGOUT_MUTATION);

    const { refetch: refetchMe } = useQuery(ME_QUERY, {
        skip: !token,
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            if (data?.me) {
                setUser(data.me);
            }
            setLoading(false);
        },
        onError: () => {
            handleLogout();
        }
    });

    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedToken = Cookies.get(TOKEN_KEY);
                if (storedToken) {
                    const decoded = jwtDecode<JWTPayload>(storedToken);
                    const currentTime = Date.now() / 1000;

                    if (decoded.exp > currentTime) {
                        setToken(storedToken);
                        await refetchMe();
                    } else {
                        handleLogout();
                    }
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                handleLogout();
            }
        };

        initAuth();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutMutation();
            
            // Clear all auth data
            setUser(null);
            setToken(null);
            
            // Clear cookies with all possible paths
            Cookies.remove(TOKEN_KEY, { path: '/' });
            
            // Clear storages
            localStorage.clear();
            sessionStorage.clear();
            
            // Force a full page reload to clear any remaining state
            window.location.href = '/auth/login';
        } catch (error) {
            console.error('Logout error:', error);
            // Force reload even if cleanup fails
            window.location.href = '/auth/login';
        }
    };

    const login = async (email: string, password: string, rememberMe: boolean) => {
        try {
            const { data } = await loginMutation({
                variables: {
                    input: { email, password }
                }
            });

            if (data?.login.success) {
                const { accessToken, user } = data.login;
                setToken(accessToken);
                setUser(user);

                // Set cookie with appropriate options
                if (rememberMe) {
                    Cookies.set(TOKEN_KEY, accessToken, { 
                        expires: 30,
                        path: '/',
                        sameSite: 'strict'
                    });
                } else {
                    Cookies.set(TOKEN_KEY, accessToken, {
                        path: '/',
                        sameSite: 'strict'
                    });
                }

                router.push('/dashboard');
            } else {
                throw new Error(data?.login.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (username: string, email: string, password: string, rememberMe: boolean) => {
        try {
            const { data } = await registerMutation({
                variables: {
                    input: { username, email, password }
                }
            });

            if (data?.register.success) {
                const { accessToken, user } = data.register;
                setToken(accessToken);
                setUser(user);

                // Set cookie with appropriate options
                if (rememberMe) {
                    Cookies.set(TOKEN_KEY, accessToken, { 
                        expires: 30,
                        path: '/',
                        sameSite: 'strict'
                    });
                } else {
                    Cookies.set(TOKEN_KEY, accessToken, {
                        path: '/',
                        sameSite: 'strict'
                    });
                }

                router.push('/dashboard');
            } else {
                throw new Error(data?.register.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout: handleLogout, loading, isAuthenticated: !!user }}>
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