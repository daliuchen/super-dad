import apiClient from "@/lib/axios";


export async function getCurrentUser() {
    const res = await apiClient.get('/api/user');
    return res.data;
}

export async function createUser(data) {
    const res = await apiClient.post('/api/user/login', data);
    return res.data;
}