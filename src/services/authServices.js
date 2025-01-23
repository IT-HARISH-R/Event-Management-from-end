import api from "../axios";

const authServices = {
    register: async (data) => {
        return await api.post('/auth/register', data);
    },
    login: async (data) => {
        return await api.post('/auth/login', data);
    },
    logout: async () => {
        return await api.get('/auth/logout');
    },
    me: async () => {
        return await api.get('/auth/profile');
    }
}

export default authServices;