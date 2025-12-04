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
    // Get dashboard statistics
    getDashboardStats: async (period: 'day' | 'week' | 'month' | 'year' = 'week') => {
        const response = await apiClient.get('/admin/dashboard/stats', {
            params: { period }
        });
        return response.data;
    },

    // Get all customers
    getAllCustomers: async (filters?: { page?: number; limit?: number; search?: string }) => {
        const response = await apiClient.get('/admin/customers', { params: filters });
        return response.data;
    },

    // Get customer by ID
    getCustomerById: async (customerId: string) => {
        const response = await apiClient.get(`/admin/customers/${customerId}`);
        return response.data;
    },

    // Update customer
    updateCustomer: async (customerId: string, data: any) => {
        const response = await apiClient.put(`/admin/customers/${customerId}`, data);
        return response.data;
    },

    // Delete customer
    deleteCustomer: async (customerId: string) => {
        const response = await apiClient.delete(`/admin/customers/${customerId}`);
        return response.data;
    },

    // Get revenue analytics
    getRevenueAnalytics: async (startDate: string, endDate: string) => {
        const response = await apiClient.get('/admin/analytics/revenue', {
            params: { startDate, endDate }
        });
        return response.data;
    },

    // Get product analytics
    getProductAnalytics: async () => {
        const response = await apiClient.get('/admin/analytics/products');
        return response.data;
    },
};

export default adminService;
