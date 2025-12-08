import apiClient from './api';

export interface SignUpData {
    full_name: string;
    email: string;
    phone_number?: string;
    password: string;
    role?: 'user' | 'admin';
}

export interface SignInData {
    email: string;
    password: string;
}

export interface SocialLoginData {
    provider: 'google' | 'facebook';
    access_token: string;
    email?: string;
    full_name?: string;
    profile_picture?: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: {
            user_id: string;
            full_name: string;
            email: string;
            phone_number?: string;
            role: string;
            profile_picture?: string;
        };
        token: string;
    };
}

const authService = {
    // Sign up a new user
    signUp: async (data: SignUpData): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/users/register', data);
        return response.data;
    },

    // Sign in existing user
    signIn: async (data: SignInData): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/users/signin', data);
        return response.data;
    },

    // Social login
    socialLogin: async (data: SocialLoginData): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/users/social-login', data);
        return response.data;
    },

    // Get user profile
    getUserProfile: async (userId: string) => {
        const response = await apiClient.get(`/auth/users/profile/${userId}`);
        return response.data;
    },

    // Update user profile
    updateProfile: async (userId: string, data: { full_name?: string; phone_number?: string; profile_picture?: string }) => {
        const response = await apiClient.put(`/auth/users/profile/${userId}`, data);
        return response.data;
    },

    // Store auth data in localStorage
    setAuthData: (token: string, user: any) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
    },

    // Get auth data from localStorage
    getAuthData: () => {
        const token = localStorage.getItem('authToken');
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        return { token, user };
    },

    // Clear auth data
    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('authToken');
    },
};

export default authService;
