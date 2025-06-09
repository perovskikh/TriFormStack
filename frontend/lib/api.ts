import axios from 'axios'
import { Product, OrderCreate } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/api/products')
  return response.data
}

export const getProduct = async (id: number): Promise<Product> => {
  const response = await api.get(`/api/products/${id}`)
  return response.data
}

export const createOrder = async (order: OrderCreate) => {
  const response = await api.post('/api/orders', order)
  return response.data
}

export default api