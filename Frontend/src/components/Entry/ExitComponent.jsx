import React, { useState } from 'react'
import {
  Box,
  Input,
  Button,
  Stack,
  Text,
  Spinner,
  Heading,
  Flex,
  useColorModeValue,
  chakra,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEntry } from '../../shared/hooks/useEntry'
const MotionBox = motion(chakra.div)

export function ExitComponent() {
  const bgCard = useColorModeValue('white', 'gray.700')
  const borderCard = useColorModeValue('gray.200', 'gray.600')

  const { isLoading, error, registerExit, setError } = useEntry()

  const [form, setForm] = useState({
    productId: '',
    quantity: '',
    exitDate: '',
    employee: '',
    reason: '',
    destination: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  const handleSubmit = async () => {
    if (!form.productId || !form.quantity || !form.exitDate || !form.employee || !form.reason || !form.destination) {
      return alert('Por favor llena todos los campos')
    }
    const response = await registerExit(form)
    if (!response?.error) {
      alert('Salida registrada correctamente')
      setForm({ productId: '', quantity: '', exitDate: '', employee: '', reason: '', destination: '' })
    }
  }

  return (
    <Box
      maxW="48em"
      mx="auto"
      p={{ base: '1.5em', md: '2em' }}
      borderRadius="1em"
      bg={useColorModeValue('gray.05', 'gray.800')}
      boxShadow="lg"
      minH="50vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Heading
        textAlign="center"
        mb="1.5em"
        fontSize={{ base: '2em', md: '3em' }}
        fontWeight="extrabold"
        color="red.500"
        letterSpacing="0.1em"
      >
        Registro de Salidas
      </Heading>

      <Stack
        direction={{ base: 'column', md: 'column' }}
        spacing="1.5em"
        w="100%"
      >
        <Input
          placeholder="ID del Producto"
          name="productId"
          value={form.productId}
          onChange={handleChange}
          size="lg"
          focusBorderColor="red.400"
          borderColor="red.300"
          _hover={{ borderColor: 'red.500' }}
          borderRadius="0.5em"
        />
        <Input
          placeholder="Cantidad"
          name="quantity"
          type="number"
          min="0"
          value={form.quantity}
          onChange={handleChange}
          size="lg"
          focusBorderColor="red.400"
          borderColor="red.300"
          _hover={{ borderColor: 'red.500' }}
          borderRadius="0.5em"
        />
        <Input
          type="date"
          name="exitDate"
          value={form.exitDate}
          onChange={handleChange}
          size="lg"
          focusBorderColor="red.400"
          borderColor="red.300"
          _hover={{ borderColor: 'red.500' }}
          borderRadius="0.5em"
        />
        <Input
          placeholder="ID del Empleado"
          name="employee"
          value={form.employee}
          onChange={handleChange}
          size="lg"
          focusBorderColor="red.400"
          borderColor="red.300"
          _hover={{ borderColor: 'red.500' }}
          borderRadius="0.5em"
        />
        <Input
          placeholder="Razón de la salida"
          name="reason"
          value={form.reason}
          onChange={handleChange}
          size="lg"
          focusBorderColor="red.400"
          borderColor="red.300"
          _hover={{ borderColor: 'red.500' }}
          borderRadius="0.5em"
        />
        <Input
          placeholder="Destino"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          size="lg"
          focusBorderColor="red.400"
          borderColor="red.300"
          _hover={{ borderColor: 'red.500' }}
          borderRadius="0.5em"
        />
        <Button
          onClick={handleSubmit}
          isLoading={isLoading}
          colorScheme="red"
          size="lg"
          borderRadius="2em"
          px="2.2em"
          py="1em"
          fontWeight="bold"
          fontSize="1.1em"
          _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
          transition="all 0.2s"
        >
          Registrar Salida
        </Button>
      </Stack>
    </Box>
  )
}