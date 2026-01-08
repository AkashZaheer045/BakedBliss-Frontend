import apiClient from './api';

export interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    pendingOrders: number;
    topProducts: Array<{
        id: number;
        title: string;
        sales: number;
        revenue: number;
    }>;
    recentOrders: Array<{
        order_id: string;
        customer_name: string;
        total: number;
        status: string;
        created_at: string;
    }>;
    revenueChart: Array<{
        date: string;
        revenue: number;
    }>;
}

const adminService = {
    // ==================== DASHBOARD ====================
    getDashboardStats: async (period: 'day' | 'week' | 'month' | 'year' = 'week') => {
        const response = await apiClient.get('/admin/dashboard/stats', {
            params: { period }
        });
        return response.data;
    },

    getRevenueAnalytics: async (startDate: string, endDate: string) => {
        const response = await apiClient.get('/admin/analytics/revenue', {
            params: { startDate, endDate }
        });
        return response.data;
    },

    getProductAnalytics: async () => {
        const response = await apiClient.get('/admin/analytics/products');
        return response.data;
    },

    // ==================== ORDERS ====================
    getAllOrders: async (filters?: { 
        page?: number; 
        limit?: number; 
        status?: string;
        search?: string;
    }) => {
        const response = await apiClient.get('/admin/orders', { params: filters });
        return response.data;
    },

    updateOrderStatus: async (orderId: string, status: string) => {
        const response = await apiClient.patch(`/admin/orders/${orderId}/status`, { status });
        return response.data;
    },

    // ==================== CUSTOMERS ====================
    getAllCustomers: async (filters?: { page?: number; limit?: number; search?: string }) => {
        const response = await apiClient.get('/admin/customers', { params: filters });
        return response.data;
    },

    getCustomerById: async (customerId: string) => {
        const response = await apiClient.get(`/admin/customers/${customerId}`);
        return response.data;
    },

    updateCustomer: async (customerId: string, data: any) => {
        const response = await apiClient.put(`/admin/customers/${customerId}`, data);
        return response.data;
    },

    deleteCustomer: async (customerId: string) => {
        const response = await apiClient.delete(`/admin/customers/${customerId}`);
        return response.data;
    },

    // ==================== PAYMENTS ====================
    getPaymentSummary: async () => {
        const response = await apiClient.get('/admin/payments/summary');
        return response.data;
    },

    // ==================== REVIEWS ====================
    getReviews: async (filters?: { page?: number; limit?: number }) => {
        const response = await apiClient.get('/admin/reviews', { params: filters });
        return response.data;
    },

    // ==================== PROMOTIONS ====================
    getPromotions: async () => {
        const response = await apiClient.get('/admin/promotions');
        return response.data;
    },

    createPromotion: async (data: {
        code: string;
        description: string;
        discount: number;
        type: 'percentage' | 'fixed';
        expiresAt?: string;
    }) => {
        const response = await apiClient.post('/admin/promotions', data);
        return response.data;
    },

    // ==================== SETTINGS ====================
    getSettings: async () => {
        const response = await apiClient.get('/admin/settings');
        return response.data;
    },

    updateSettings: async (data: any) => {
        const response = await apiClient.put('/admin/settings', data);
        return response.data;
    },
};

export default adminService;

