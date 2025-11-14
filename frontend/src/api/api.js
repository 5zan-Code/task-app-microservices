import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const authAPI = {
  signup: async (username, email, password) => {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      username,
      email,
      password
    });
    return response.data;
  },
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    return response.data;
  }
};

export const tasksAPI = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  },
  create: async (title, description) => {
    const response = await axios.post(`${API_URL}/tasks`, {
      title,
      description
    });
    return response.data;
  },
  update: async (id, updates) => {
    const response = await axios.put(`${API_URL}/tasks/${id}`, updates);
    return response.data;
  },
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    return response.data;
  }
};

