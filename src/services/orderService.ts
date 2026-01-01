import apiClient from './api';

// Order-specific cart item (backend may expect different field names)
export interface OrderCartItem {
    product_id: number;
    quantity: number;
    price: number;
    title?: string;
}

export interface DeliveryAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface CreateOrderData {
    user_id: string;
    cart_items: OrderCartItem[];
    delivery_address: DeliveryAddress;
    total_amount: number;
}

export interface Order {
    id: number;
    order_id: string;
    user_id: string;
    cart_items: OrderCartItem[];
    delivery_address: DeliveryAddress;
    status: string;
    total_amount: number;
    created_at: string;
    updated_at?: string;
}

export interface UpdateOrderStatusData {
    order_id: string;
    status: string;
}

const orderService = {
    // Create a new order
    createOrder: async (data: CreateOrderData) => {
        const apiData = {
            cartItems: data.cart_items,
            deliveryAddress: data.delivery_address,
            totalAmount: data.total_amount
        };
        const response = await apiClient.post('/order/create', apiData);
        return response.data;
    },

    // Get user's orders
    getUserOrders: async (userId: string) => {
        const response = await apiClient.get(`/order/user/${userId}`);
        return response.data;
    },

    // Get order by ID
    getOrderById: async (orderId: string) => {
        const response = await apiClient.get(`/order/${orderId}`);
        return response.data;
    },

    // Get all orders (admin)
    getAllOrders: async (filters?: { status?: string; page?: number; limit?: number }) => {
        const response = await apiClient.get('/order/all', { params: filters });
        return response.data;
    },

    // Update order status (admin)
    updateOrderStatus: async (data: UpdateOrderStatusData) => {
        const response = await apiClient.put('/order/status', data);
        return response.data;
    },

    // Cancel order
    cancelOrder: async (orderId: string) => {
        const response = await apiClient.put(`/order/cancel/${orderId}`);
        return response.data;
    },

    // Get order statistics (admin)
    getOrderStats: async () => {
        const response = await apiClient.get('/order/stats');
        return response.data;
    },
};

export default orderService;
