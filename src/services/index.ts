// Export all services from a single entry point
export { default as authService } from './authService';
export { default as productService } from './productService';
export { default as cartService } from './cartService';
export { default as orderService } from './orderService';
export { default as adminService } from './adminService';
export { default as contactService } from './contactService';
export { default as apiClient } from './api';

// Export types
export type { SignUpData, SignInData, SocialLoginData, AuthResponse } from './authService';
export type { Product, ProductFilters, CreateProductData, UpdateProductData } from './productService';
export type { CartItem, Cart, AddToCartData, UpdateCartItemData } from './cartService';
export type { Order, CreateOrderData, DeliveryAddress, UpdateOrderStatusData } from './orderService';
export type { DashboardStats } from './adminService';
export type { ContactMessageData } from './contactService';
