import apiClient from './api';

export interface CartItem {
    product_id: number;
    quantity: number;
    price: number;
    title?: string;
    thumbnail?: string;
}

export interface Cart {
    id: number;
    user_id: string;
    items: CartItem[];
    created_at?: string;
    updated_at?: string;
}

export interface AddToCartData {
    user_id: string;
    product_id: number;
    quantity: number;
}

export interface UpdateCartItemData {
    user_id: string;
    product_id: number;
    quantity: number;
}

const cartService = {
    // Get user's cart
    getCart: async (userId: string) => {
        const response = await apiClient.get(`/cart/${userId}`);
        return response.data;
    },

    // Add item to cart
    addToCart: async (data: AddToCartData) => {
        const response = await apiClient.post('/cart/add', data);
        return response.data;
    },

    // Update cart item quantity
    updateCartItem: async (data: UpdateCartItemData) => {
        const response = await apiClient.put('/cart/update', data);
        return response.data;
    },

    // Remove item from cart
    removeFromCart: async (userId: string, productId: number) => {
        const response = await apiClient.delete('/cart/remove', {
            data: { user_id: userId, product_id: productId }
        });
        return response.data;
    },

    // Clear entire cart
    clearCart: async (userId: string) => {
        const response = await apiClient.delete(`/cart/clear/${userId}`);
        return response.data;
    },
};

export default cartService;
