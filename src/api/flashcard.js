import axios  from 'axios';
import { API_BASE } from './config';

const api = axios.create({
  baseURL: API_BASE,
});

export const flashcardsApi = {
    getAll: () => api.get('/flashcards'),
    getById: (id) => api.get(`/flashcards/${id}`),
    getByLevel: (level) => api.get(`/flashcards?level=${level}`),
};

export const resultApi = {
    getResult: () => api.get('/results'),
    submitResult: (result) => api.post('/results', result),
}