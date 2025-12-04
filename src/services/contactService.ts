import apiClient from './api';

export interface ContactMessageData {
    name: string;
    email: string;
    subject?: string;
    message: string;
    phone_number?: string;
}

const contactService = {
    // Send contact message
    sendMessage: async (data: ContactMessageData) => {
        const response = await apiClient.post('/contact/send', data);
        return response.data;
    },

    // Get all contact messages (admin)
    getAllMessages: async (filters?: { page?: number; limit?: number }) => {
        const response = await apiClient.get('/contact/messages', { params: filters });
        return response.data;
    },

    // Mark message as read (admin)
    markAsRead: async (messageId: number) => {
        const response = await apiClient.put(`/contact/messages/${messageId}/read`);
        return response.data;
    },
};

export default contactService;
