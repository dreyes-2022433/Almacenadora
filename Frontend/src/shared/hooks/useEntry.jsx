import { registerEntryRequest, registerExitRequest, fetchEntries } from '../../services/api'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const useEntry = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [entries, setEntries] = useState([])

  const registerEntry = async (entryData) => {
    setIsLoading(true)
    try {
      const response = await registerEntryRequest(entryData)
      setIsLoading(false)
      if (response.error) {
        setError(true)
        toast.error(response.error?.response?.data?.message || 'Error al registrar la entrada')
        return
      }
      toast.success('Entrada registrada correctamente')
      return response
    } catch (err) {
      setIsLoading(false)
      setError(true)
      toast.error('Error al registrar la entrada')
    }
  }

  const registerExit = async (exitData) => {
    setIsLoading(true)
    try {
      const response = await registerExitRequest(exitData)
      setIsLoading(false)
      if (response.error) {
        setError(true)
        toast.error(response.error?.response?.data?.message || 'Error al registrar la salida')
        return
      }
      toast.success('Salida registrada correctamente')
      return response
    } catch (err) {
      setIsLoading(false)
      setError(true)
      toast.error('Error al registrar la salida')
    }
  }

  const getEntries = async () => {
  setIsLoading(true)
  try {
    const response = await fetchEntries() 
    setIsLoading(false)
    if (response.error) {
      setError(true)
      toast.error('Error al obtener el historial de movimientos')
      return
    }
    setEntries(response.data?.Entrys || [])
    return response.data?.Entrys || []
  } catch (err) {
    setIsLoading(false)
    setError(true)
    toast.error('Error al obtener el historial de movimientos')
  }
}

  return {
    isLoading,
    error,
    entries,
    registerEntry,
    registerExit,
    getEntries,
    setError,
  }
}