import apiClient from './api';

export interface FavoriteItem {
    id: number;
    productId: number;
    userId: string;
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
    // Get user favorites
    getFavorites: async (userId: string) => {
        const response = await apiClient.get(`/user/${userId}/favorites`);
        return response.data;
    },

    // Add to favorites
    addFavorite: async (userId: string, productId: number | string) => {
        const response = await apiClient.post(`/user/${userId}/favorites`, { productId });
        return response.data;
    },

    // Remove from favorites
    removeFavorite: async (userId: string, productId: number | string) => {
        const response = await apiClient.delete(`/user/${userId}/favorites/${productId}`);
        return response.data;
    }
};

export default userService;
