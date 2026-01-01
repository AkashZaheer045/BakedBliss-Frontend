import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, AuthResponse } from '@/services';

interface User {
    user_id: string;
    full_name: string;
    email: string;
    phone_number?: string;
    role: string;
    profile_picture?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: any) => Promise<void>;
    logout: () => void;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load auth data from localStorage on mount
    useEffect(() => {
        const { token: savedToken, user: savedUser } = authService.getAuthData();
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(savedUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await authService.signIn({ email, password });

            // Backend returns { message: "success", data: {...userData}, token: "..." }
            if (response.message === 'success' && response.data && response.token) {
                // Map backend camelCase response to frontend snake_case User interface
                const userData: User = {
                    user_id: response.data.userId,
                    full_name: response.data.fullName,
                    email: response.data.email,
                    phone_number: response.data.phoneNumber,
                    role: response.data.role,
                    profile_picture: response.data.profilePicture,
                };
                const authToken = response.token;

                // Save to state
                setUser(userData);
                setToken(authToken);

                // Save to localStorage
                authService.setAuthData(authToken, userData);
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const signup = async (data: any) => {
        try {
            const response = await authService.signUp(data);

            // Backend returns { message: "success", data: {...userData}, token: "..." }
            if (response.message === 'success' && response.data && response.token) {
                // Map backend camelCase response to frontend snake_case User interface
                const userData: User = {
                    user_id: response.data.userId,
                    full_name: response.data.fullName,
                    email: response.data.email,
                    phone_number: response.data.phoneNumber,
                    role: response.data.role,
                    profile_picture: response.data.profilePicture,
                };
                const authToken = response.token;

                // Save to state
                setUser(userData);
                setToken(authToken);

                // Save to localStorage
                authService.setAuthData(authToken, userData);
            } else {
                throw new Error(response.message || 'Signup failed');
            }
        } catch (error: any) {
            console.error('Signup error:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        authService.logout();
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
        if (token) {
            authService.setAuthData(token, updatedUser);
        }
    };

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        signup,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
