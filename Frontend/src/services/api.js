import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: 'http://localhost:3636',
  timeout: 2000,
})

export const registerRequest = async (user) => {
  try {
    return await api.post('/user/register', user, {
      type: 'multipart/form-data',
    })
  } catch (error) {
    return {
      error: true,
      error,
    }
  }
}

export const loginRequest = async (user) => {
  try {
    return await api.post('/user/login', user, {
      type: 'multipart/form-data',
    })
  } catch (error) {
    return {
      error: true,
      error,
    }
  }
}

export const fetchSuppliers = async () => {
  try {
    return await api.get('/supplier/suppliers')
  } catch (error) {
    return { error: true, error }
  }
}

export const createSupplier = async (supplierData) => {
  try {
    return await api.post('/supplier/addsuppliers', supplierData)
  } catch (error) {
    return { error: true, error }
  }
}

export const fetchClients = async () => {
  try {
    return await api.get('/client')
  } catch (error) {
    return { error: true, error }
  }
}

export const createClient = async (clientData) => {
  try {
    return await api.post('/client', clientData)
  } catch (error) {
    return { error: true, error }
  }
}

export const registerEntryRequest = async (entryData) => {
  try {
    return await api.post('/entry/entry', entryData)
  } catch (error) {
    return { error: true, error }
  }
}

export const registerExitRequest = async (exitData) => {
  try {
    return await api.post('/entry/exit', exitData)
  } catch (error) {
    return { error: true, error }
  }
}

export const fetchEntries = async () => {
  try {
     return await api.get('/entry/movements')
  } catch (error) {
    return { error: true, error }
  }
}