import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: 'http://localhost:3636',
  timeout: 2000,
})



export const registerRequest = async (user) => {
    try{
        return await api.post('/user/register', user,{
            type: 'multipart/form-data',
        })
    }catch (error) {
        return {
            error: true,
            error
        }
    }
}

export const loginRequest = async (user) => {
    try{
        return await api.post('/user/login', user,{
            type: 'multipart/form-data',
        })
    }catch (error) {
        return {
            error: true,
            error
        }
    }
}