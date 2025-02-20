import axios from "axios";

const api_url = 'http://localhost:4000/tasks';

export const getTasks = async (filters={}) => {
    const params = new URLSearchParams(filters).toString();
    return axios.get(`${api_url}?${params}`);
}


export const addTask = async (title, description) => {
    return axios.post(api_url, { title, description });
}
export const updateTask = async (id, updatedFields) => {
    return axios.put(`${api_url}/${id}`,  updatedFields);
}
export const deleteTask = async (id) => {
    return axios.delete(`${api_url}/${id}`);
}

export const getTaskById = async (id) => {
    return axios.get(`${api_url}/${id}`);
}
