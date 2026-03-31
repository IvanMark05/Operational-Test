import axios from 'axios'

// Create Axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // replace with your API
  timeout: 5000,
})

// Optional: response interceptor for global error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error.response || error.message)
    return Promise.reject(error)
  }
)

export const createTask = async (data) => {
  try {
    const response = await api.post('/api/tasks/', data)
    return response.data
  } catch (error) {
    console.error('Failed to create user:', error)
    throw error
  }
}

export const getTask = async () => {
  try {
    const response = await api.get('/api/tasks/')
    return response.data
  } catch (error) {
    console.error('Failed to create user:', error)
    throw error
  }
}

export const updateTask = async (id, data) => {
  try {
    const response = await api.patch(`/api/tasks/${id}/`, data)
    return response.data
  } catch (error) {
    console.error('Failed to create user:', error)
    throw error
  }
}

export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/api/tasks/${id}/`)
    return response.data
  } catch (error) {
    console.error('Failed to create user:', error)
    throw error
  }
}

export default api