import { API_URL, getHeaders } from '../services/api';

export const getCategories = async () => {
    const response = await fetch(`${API_URL}/categories`, {
        method: 'GET',
        headers: getHeaders() as any
    });
    return response.json();
};

export const createCategory = async (data: any) => {
    const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: getHeaders() as any,
        body: JSON.stringify(data)
    });
    return response.json();
};

export const deleteCategory = async (id: string) => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: getHeaders() as any
    });
    return response.json();
};
