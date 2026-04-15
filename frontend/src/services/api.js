import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getPosts = () => api.get('/posts');
export const getPost = (id) => api.get(`/posts/${id}`);
export const createPost = (postData) => api.post('/posts', postData);
export const updatePost = (id, postData) => api.put(`/posts/${id}`, postData);
export const deletePost = (id) => api.delete(`/posts/${id}`);

export default api;
