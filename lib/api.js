// lib/api.js
const API_BASE_URL = '/api';

async function callApi(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Something went wrong');
  }
  return response.json();
}

export const notesApi = {
  getNotes: () => callApi('/notes'),
  getNoteById: (id) => callApi(`/notes/${id}`),
  createNote: (noteData) => callApi('/notes', { method: 'POST', body: JSON.stringify(noteData) }),
  updateNote: (id, noteData) => callApi(`/notes/${id}`, { method: 'PUT', body: JSON.stringify(noteData) }),
  deleteNote: (id) => callApi(`/notes/${id}`, { method: 'DELETE' }),
};

export const authApi = {
  login: (credentials) => callApi('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => callApi('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
};