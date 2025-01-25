const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    console.error('NEXT_PUBLIC_API_URL is not defined in environment variables');
}

// Types
export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    balance: number;
}

interface AuthResponse {
    success: boolean;
    accessToken: string;
    user: User;
    error?: string;
}

export interface SlotMachine {
    id: string;
    machineId: string;
    name: string;
    location: string;
    status: 'active' | 'inactive' | 'maintenance';
    gameType: string;
    metrics: {
        totalBets: number;
        totalWins: number;
        rtp: number;
        hitFrequency: number;
        maxWin: number;
    };
}

// Auth API calls
export const authApi = {
    register: async (data: { username: string; email: string; password: string }): Promise<AuthResponse> => {
        console.log('Making registration request to:', `${API_URL}/auth/register`);
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            const json = await res.json();
            console.log('Registration response:', json);
            return json;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
        console.log('Making login request to:', `${API_URL}/auth/login`);
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            const json = await res.json();
            console.log('Login response:', json);
            return json;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    getMe: async (token: string) => {
        try {
            const res = await fetch(`${API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
            });
            return res.json();
        } catch (error) {
            console.error('GetMe error:', error);
            throw error;
        }
    },

    updateBalance: async (token: string, amount: number) => {
        try {
            const res = await fetch(`${API_URL}/auth/balance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ amount }),
                credentials: 'include',
            });
            return res.json();
        } catch (error) {
            console.error('Update balance error:', error);
            throw error;
        }
    },

    getBalance: async (token: string) => {
        try {
            const res = await fetch(`${API_URL}/auth/balance`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
            });
            return res.json();
        } catch (error) {
            console.error('Get balance error:', error);
            throw error;
        }
    },
};

// Slots API calls
export const slotsApi = {
    getAll: async (token: string) => {
        const res = await fetch(`${API_URL}/slots`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.json();
    },

    getOne: async (token: string, id: string) => {
        const res = await fetch(`${API_URL}/slots/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.json();
    },

    create: async (token: string, data: Partial<SlotMachine>) => {
        const res = await fetch(`${API_URL}/slots`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return res.json();
    },

    update: async (token: string, id: string, data: Partial<SlotMachine>) => {
        const res = await fetch(`${API_URL}/slots/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return res.json();
    },

    delete: async (token: string, id: string) => {
        const res = await fetch(`${API_URL}/slots/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.json();
    },

    updateMetrics: async (token: string, id: string, data: { bet: number; win: number }) => {
        const res = await fetch(`${API_URL}/slots/${id}/metrics`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return res.json();
    },

    getStats: async (token: string, id: string) => {
        const res = await fetch(`${API_URL}/slots/${id}/stats`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.json();
    },
}; 