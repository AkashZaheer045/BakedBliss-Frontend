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
    getProfile: async (_userId?: number) => {
        const response = await apiClient.get('/users/profile');
        return response.data;
    },

    // Get user favorites
    getFavorites: async (_userId?: number) => {
        const response = await apiClient.get('/users/favorites');
        return response.data;
    },

    // Add to favorites
    addFavorite: async (_userId: number | undefined, productId: number | string) => {
        const response = await apiClient.post('/users/favorites', { productId });
        return response.data;
    },

    // Remove from favorites
    removeFavorite: async (_userId: number | undefined, productId: number | string) => {
        const response = await apiClient.delete(`/users/favorites/${productId}`);
        return response.data;
    }
};

export default userService;
