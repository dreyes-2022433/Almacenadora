import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { fetchClients, createClient } from '../../services/api.js'

export function useClient() {
  const [clients, setClients] = useState([])
  const [form, setForm] = useState({ name: '', contact: '', company: '' })
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const loadClients = async () => {
    setLoading(true)
    const res = await fetchClients()
    if (res.error) {
      toast({ title: 'Error al cargar clientes', status: 'error', duration: 3000, isClosable: true })
    } else {
      setClients(res.data.clients || [])
    }
    setLoading(false)
  }

  const addClient = async () => {
    if (!form.name || !form.contact) {
      toast({ title: 'Completa nombre y contacto', status: 'warning', duration: 3000, isClosable: true })
      return
    }
    setLoading(true)
    const res = await createClient(form)
    if (res.error) {
      toast({ title: 'Error al agregar cliente', status: 'error', duration: 3000, isClosable: true })
    } else {
      setClients(prev => [...prev, res.data.client])
      toast({ title: 'Cliente agregado', status: 'success', duration: 3000, isClosable: true })
      setForm({ name: '', contact: '', company: '' })
    }
    setLoading(false)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    loadClients()
  }, [])

  return { clients, form, loading, handleChange, addClient }
}
