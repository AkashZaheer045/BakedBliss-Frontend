import apiClient from './api';

export interface ContactMessageData {
    fullName: string;
    email: string;
    subject?: string;
    message: string;
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
};

export default contactService;
