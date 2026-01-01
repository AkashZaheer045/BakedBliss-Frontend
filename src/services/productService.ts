import apiClient from './api';

export interface Product {
    id: number;
    title: string;
    price: number;
    sale_price?: number;
    thumbnail?: string;
    rating?: number;
    category?: string;
    rating_count?: number;
    ingredients?: any[];
    description?: string;
    tagline?: string;
    images?: string[];
    stock: number;
    created_at?: string;
    updated_at?: string;
}

export interface ProductFilters {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
}

export interface CreateProductData {
    title: string;
    price: number;
    sale_price?: number;
    category?: string;
    description?: string;
    tagline?: string;
    stock: number;
    ingredients?: any[];
    thumbnail?: string;
    images?: string[];
}

export interface UpdateProductData extends Partial<CreateProductData> {
    id: number;
}

const productService = {
    // List products with filters
    listProducts: async (filters?: ProductFilters) => {
        const response = await apiClient.get('/products', { params: filters });
        return response.data;
    },

    // Search products
    searchProducts: async (query: string) => {
        const response = await apiClient.get('/products/search', {
            params: { query }
        });
        return response.data;
    },

    // Get product by ID
    getProductById: async (productId: string | number) => {
        const response = await apiClient.get(`/products/${productId}`);
        return response.data;
    },

    // Get products by category
    getProductsByCategory: async (category: string) => {
        const response = await apiClient.get(`/products/category/${category}`);
        return response.data;
    },

    // Get trending products
    getTrendingProducts: async () => {
        const response = await apiClient.get('/products/trending');
        return response.data;
    },

    // Get product categories
    getCategories: async () => {
        const response = await apiClient.get('/products/categories');
        return response.data;
    },

    // Get personalized recommendations
    getRecommendations: async (userId: string) => {
        const response = await apiClient.get(`/products/recommendations/${userId}`);
        return response.data;
    },

    // Create product (admin)
    createProduct: async (data: CreateProductData) => {
        const response = await apiClient.post('/products/upload', data);
        return response.data;
    },

    // Update product (admin)
    updateProduct: async (data: UpdateProductData) => {
        const { id, ...updateData } = data;
        const response = await apiClient.put(`/products/${id}`, updateData);
        return response.data;
    },

    // Delete product (admin)
    deleteProduct: async (productId: number) => {
        const response = await apiClient.delete(`/products/${productId}`);
        return response.data;
    },
};

export default productService;
