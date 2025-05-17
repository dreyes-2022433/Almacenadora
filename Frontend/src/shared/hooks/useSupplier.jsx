import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { fetchSuppliers, createSupplier } from '../../services/api.js'

export function useSupplier() {
  const [suppliers, setSuppliers] = useState([])
  const [form, setForm] = useState({ name: '', contact: '' })
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const loadSuppliers = async () => {
    setLoading(true)
    const res = await fetchSuppliers()
    if (res.error) {
      toast({ title: 'Error al cargar proveedores', status: 'error', duration: 3000, isClosable: true })
    } else {
      setSuppliers(res.data.suppliers || [])
    }
    setLoading(false)
  }

const addSupplier = async () => {
  if (!form.name || !form.contact) {
    toast({ title: 'Completa nombre y contacto', status: 'warning', duration: 3000, isClosable: true })
    return
  }
  setLoading(true)
  try {
    console.log('Enviando datos:', form)
    const res = await createSupplier(form)
    console.log('Respuesta completa:', res)
    if (res.error) {
      toast(
        { 
            title: 'Error al agregar proveedor', 
            status: 'error', 
            duration: 3000, 
            isClosable: true 
        })
    } else if (res.status === 201) {
      setSuppliers(prev => [...prev, res.data.supplier])
      toast(
        { 
            title: 'Proveedor agregado', 
            status: 'success', 
            duration: 3000, 
            isClosable: true 
        })
      setForm({ name: '', contact: '' })
    } else {
      toast(
        { 
            title: `Error inesperado: ${res.status}`, 
            status: 'error', 
            duration: 3000, 
            isClosable: true 
        })
    }
  } catch (error) {
    console.error('Error catch en addSupplier:', error)
    toast(
        { 
            title: 'Error en la petición', 
            status: 'error', 
            duration: 3000, 
            isClosable: true 
        })
  }
  setLoading(false)
}


  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    loadSuppliers()
  }, [])

  return { suppliers, form, loading, handleChange, addSupplier }
}
