import apiClient from './api';

export interface FavoriteItem {
    id: number;
    productId: number;
    userId: number;
    product: {
        id: number;
        title: string;
        price: number;
        sale_price?: number;
        thumbnail: string;
        category: string;
        stock: number;
    };
    created_at: string;
}

const userService = {
    // Get user profile
    getProfile: async (userId: number) => {
        const response = await apiClient.get(`/users/profile/${userId}`);
        return response.data;
    },

    // Get user favorites
    getFavorites: async (userId: number) => {
        const response = await apiClient.get(`/users/${userId}/favorites`);
        return response.data;
    },

    // Add to favorites
    addFavorite: async (userId: number, productId: number | string) => {
        const response = await apiClient.post(`/users/${userId}/favorites`, { productId });
        return response.data;
    },

    // Remove from favorites
    removeFavorite: async (userId: number, productId: number | string) => {
        const response = await apiClient.delete(`/users/${userId}/favorites/${productId}`);
        return response.data;
    }
};

export default userService;
