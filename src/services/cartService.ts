import apiClient from './api';

export interface CartItem {
    productId: number;
    quantity: number;
    price?: number;
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
    productId: number;
    quantity: number;
}

export interface UpdateCartItemData {
    productId: number;
    quantity: number;
}

const cartService = {
    // Get user's cart (uses JWT token for user identification)
    getCart: async () => {
        const response = await apiClient.get('/cart/view');
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
    removeFromCart: async (productId: number) => {
        const response = await apiClient.delete('/cart/remove', {
            data: { productId }
        });
        return response.data;
    },

    // Clear entire cart
    clearCart: async () => {
        const response = await apiClient.delete('/cart/clear');
        return response.data;
    },
};

export default cartService;

