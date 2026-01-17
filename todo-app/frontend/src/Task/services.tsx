import { API_URL, getHeaders } from '../services/api';

export const getTasks = async (filters: any = {}) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}/tasks?${query}`, {
        method: 'GET',
        headers: getHeaders() as any
    });
    return response.json();
};

export const createTask = async (data: any) => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: getHeaders() as any,
        body: JSON.stringify(data)
    });
    return response.json();
};

export const updateTask = async (id: string, data: any) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: getHeaders() as any,
        body: JSON.stringify(data)
    });
    return response.json();
};

export const deleteTask = async (id: string) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: getHeaders() as any
    });
    return response.json();
};

export const toggleComplete = async (id: string) => {
    const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
        method: 'PATCH',
        headers: getHeaders() as any
    });
    return response.json();
};
