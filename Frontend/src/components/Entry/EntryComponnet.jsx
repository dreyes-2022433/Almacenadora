import React, { useEffect, useState } from 'react'
import {
  Box,
  Input,
  Button,
  Stack,
  Text,
  Spinner,
  Heading,
  Flex,
  SimpleGrid,
  Divider,
  useColorModeValue,
  chakra,
  useToast,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useEntry } from '../../shared/hooks/useEntry'

const MotionBox = motion(chakra.div)

export function EntryComponent() {
  const toast = useToast()
  const bgCard = useColorModeValue('white', 'gray.700')
  const borderCard = useColorModeValue('gray.200', 'gray.600')
  const scrollBg = useColorModeValue('gray.50', 'gray.900')
  const headingColor = useColorModeValue('blue.600', 'blue.300')
  const productTextColor = useColorModeValue('blue.700', 'blue.300')
  const textColor = useColorModeValue('gray.600', 'gray.400')
  const noEntriesColor = useColorModeValue('gray.500', 'gray.400')

  const { entries, isLoading, registerEntry, getEntries, setError, error } = useEntry()

  const [form, setForm] = useState({
    product: '',
    quantity: '',
    entryDate: '',
    employee: '',
  })

  useEffect(() => {
    getEntries()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  const handleSubmit = async () => {
    if (!form.product || !form.quantity || !form.entryDate || !form.employee) {
      toast({
        title: 'Campos incompletos',
        description: 'Por favor llena todos los campos para continuar',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      })
      return
    }
    const response = await registerEntry(form)
    if (!response?.error) {
      toast({
        title: 'Entrada registrada',
        description: 'La entrada fue registrada exitosamente',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
      setForm({ product: '', quantity: '', entryDate: '', employee: '' })
      getEntries()
    }
  }

  return (
    <Box
      maxW="102vw"
      mx="auto"
      p="3em"
      borderRadius="1em"
      bg={useColorModeValue('gray.100', 'gray.900')}
      boxShadow="xl"
      minH="80vh"
    >
      <Flex gap="4em" height="100%">
        <Box flex="0 0 25%" bg={useColorModeValue('white', 'gray.700')} p="2em" borderRadius="lg" boxShadow="md" minH="85vh">
          <Heading
            fontSize="2em"
            mb="5em"
            color={headingColor}
            fontWeight="extrabold"
            textAlign="center"
          >
            Registro de Entradas
          </Heading>
          <Stack spacing="1.2em">
            <Input
              placeholder="ID del Producto"
              name="product"
              value={form.product}
              onChange={handleChange}
              size="md"
              focusBorderColor={headingColor}
              borderRadius="md"
            />
            <Input
              placeholder="Cantidad"
              name="quantity"
              type="number"
              min="0"
              value={form.quantity}
              onChange={handleChange}
              size="md"
              focusBorderColor={headingColor}
              borderRadius="md"
            />
            <Input
              type="date"
              name="entryDate"
              value={form.entryDate}
              onChange={handleChange}
              size="md"
              focusBorderColor={headingColor}
              borderRadius="md"
            />
            <Input
              placeholder="ID del Empleado"
              name="employee"
              value={form.employee}
              onChange={handleChange}
              size="md"
              focusBorderColor={headingColor}
              borderRadius="md"
            />
            <Button
              onClick={handleSubmit}
              isLoading={isLoading}
              colorScheme="blue"
              size="md"
              borderRadius="2em"
              fontWeight="bold"
              mt="1.5em"
              _hover={{ transform: 'scale(1.05)', boxShadow: 'md' }}
              transition="all 0.3s"
            >
              Registrar
            </Button>
          </Stack>
        </Box>

        <Box flex="1" display="flex" flexDirection="column" maxH="75vh" borderRadius="lg" boxShadow="md" p="2em" bg={scrollBg}>
          <Heading
            fontSize="1.8em"
            mb="1.5em"
            color={headingColor}
            fontWeight="semibold"
            textAlign="center"
          >
            Historial de Entradas
          </Heading>

          {isLoading ? (
            <Flex justifyContent="center" alignItems="center" flex="1">
              <Spinner size="xl" color={headingColor} />
            </Flex>
          ) : entries.length === 0 ? (
            <Text
              color={noEntriesColor}
              fontStyle="italic"
              fontSize="1.2em"
              textAlign="center"
              flex="1"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              No hay entradas registradas
            </Text>
          ) : (
            <Box
              flex="1"
              overflowY="auto"
              sx={{
                '&::-webkit-scrollbar': { width: '8px' },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0, 0, 139, 0.5)',
                  borderRadius: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: useColorModeValue('gray.300', 'gray.700'),
                  borderRadius: '6px',
                },
              }}
            >
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="1.5em" minChildWidth="14em">
                {entries.map((entry) => (
                  <MotionBox
                    key={entry._id}
                    bg={bgCard}
                    border={`1.5px solid ${borderCard}`}
                    borderRadius="md"
                    p="1.2em"
                    boxShadow="sm"
                    cursor="default"
                    whileHover={{
                      scale: 1.04,
                      boxShadow: '0 8px 15px rgba(0, 0, 139, 0.4)',
                    }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <Text fontWeight="bold" fontSize="lg" mb="0.3em" color={productTextColor} noOfLines={1}>
                      Producto: {entry.product?.name || entry.product || 'N/A'}
                    </Text>
                    <Text fontSize="md" color={textColor} noOfLines={1} mb="0.2em">
                      Cantidad: {entry.quantity}
                    </Text>
                    <Text fontSize="md" color={textColor} noOfLines={1} mb="0.2em">
                      Fecha: {entry.Date ? new Date(entry.Date).toLocaleDateString() : 'Fecha no disponible'}
                    </Text>
                    <Text fontSize="md" color={textColor} noOfLines={1}>
                      Empleado: {entry.employee?.name || entry.employee || 'N/A'}
                    </Text>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  )
}