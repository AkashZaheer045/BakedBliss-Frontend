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
            
            // Debug logging
            console.log('[Auth] Login response:', response);
            console.log('[Auth] Status:', response.status);
            console.log('[Auth] Data:', response.data);
            console.log('[Auth] AccessToken exists:', !!response.data?.accessToken);

            // Backend returns { status: "success", data: { user: {...}, accessToken, refreshToken } }
            if (response.status === 'success' && response.data?.user && response.data?.accessToken) {
                // Map backend camelCase response to frontend snake_case User interface
                const userData: User = {
                    user_id: response.data.user.userId,
                    full_name: response.data.user.fullName,
                    email: response.data.user.email,
                    phone_number: response.data.user.phoneNumber,
                    role: response.data.user.role,
                    profile_picture: response.data.user.profilePicture,
                };
                const authToken = response.data.accessToken;
                
                console.log('[Auth] Saving token:', authToken?.substring(0, 20) + '...');

                // Save to state
                setUser(userData);
                setToken(authToken);

                // Save to localStorage (also save refreshToken for later use)
                authService.setAuthData(authToken, userData);
                if (response.data.refreshToken) {
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                }
                
                console.log('[Auth] Token saved to localStorage:', localStorage.getItem('authToken')?.substring(0, 20) + '...');
            } else {
                console.error('[Auth] Response check failed:', {
                    status: response.status,
                    hasUser: !!response.data?.user,
                    hasAccessToken: !!response.data?.accessToken
                });
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

            // Backend returns { status: "success", data: { user: {...}, accessToken, refreshToken } }
            if (response.status === 'success' && response.data?.user && response.data?.accessToken) {
                // Map backend camelCase response to frontend snake_case User interface
                const userData: User = {
                    user_id: response.data.user.userId,
                    full_name: response.data.user.fullName,
                    email: response.data.user.email,
                    phone_number: response.data.user.phoneNumber,
                    role: response.data.user.role,
                    profile_picture: response.data.user.profilePicture,
                };
                const authToken = response.data.accessToken;

                // Save to state
                setUser(userData);
                setToken(authToken);

                // Save to localStorage
                authService.setAuthData(authToken, userData);
                if (response.data.refreshToken) {
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                }
            } else {
                // If response has error status, throw with the message
                const error: any = new Error(response.message || 'Signup failed');
                error.response = { data: response };
                throw error;
            }
        } catch (error: any) {
            console.error('Signup error:', error);
            // Re-throw with full error structure preserved
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
