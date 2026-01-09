import apiClient from './api';

export interface SignUpData {
    fullName: string;
    email: string;
    phoneNumber?: string;
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
    status: string;
    statusCode: number;
    message: string;
    data: {
        user: {
            userId: string;
            fullName: string;
            email: string;
            phoneNumber?: string;
            role: string;
            profilePicture?: string;
            addresses?: any[];
            dateJoined?: string;
            selectedAddressId?: string | null;
        };
        accessToken: string;
        refreshToken: string;
    };
}

const authService = {
    // Sign up a new user
    signUp: async (data: SignUpData): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/register', data);
        return response.data;
    },

    // Sign in existing user
    signIn: async (data: SignInData): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/login', data);
        return response.data;
    },

    // Social login
    socialLogin: async (data: SocialLoginData): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/social-login', data);
        return response.data;
    },

    // Get user profile
    getUserProfile: async (userId: string) => {
        const response = await apiClient.get(`/users/profile/${userId}`);
        return response.data;
    },

    // Update user profile
    updateProfile: async (userId: string, data: { full_name?: string; phone_number?: string; profile_picture?: string }) => {
        const apiData = {
            fullName: data.full_name,
            phoneNumber: data.phone_number,
            profilePicture: data.profile_picture
        };
        const response = await apiClient.put(`/users/profile/${userId}`, apiData);
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

    // Clear auth data - comprehensive cleanup to prevent session conflicts
    logout: () => {
        // Clear all auth-related data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
        
        // Clear any cached cart or session data
        localStorage.removeItem('cart');
        localStorage.removeItem('selectedAddress');
        
        // Clear session storage as well
        sessionStorage.clear();
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('authToken');
    },
};

export default authService;
