import React from 'react'
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
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useSupplier } from '../../shared/hooks/useSupplier'

const MotionBox = motion(chakra.div)

export function SupplierComponent() {
  const { suppliers, form, loading, handleChange, addSupplier } = useSupplier()
  const bgCard = useColorModeValue('white', 'gray.700')
  const borderCard = useColorModeValue('gray.200', 'gray.600')
  const scrollBg = useColorModeValue('gray.05', 'gray.900')

  return (
    <Box
      maxW="64em"
      mx="auto"
      p={{ base: '1.5em', md: '2em' }}
      borderRadius="1em"
      bg={useColorModeValue('gray.05', 'gray.800')}
      boxShadow="lg"
      minH="80vh"
      display="flex"
      flexDirection="column"
    >
      <Heading
        textAlign="center"
        mb="1.5em"
        fontSize={{ base: '2em', md: '3em' }}
        fontWeight="extrabold"
        color="teal.500"
        letterSpacing="0.1em"
      >
        Registro de Proveedores
      </Heading>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing="1.2em"
        mb="2.5em"
        alignItems="center"
        justifyContent="center"
      >
        <Input
          flex="1"
          placeholder="Nombre"
          name="name"
          value={form.name}
          onChange={handleChange}
          size="lg"
          focusBorderColor="teal.400"
          borderColor="teal.300"
          _hover={{ borderColor: 'teal.500' }}
          transition="border-color 0.3s"
          borderRadius="0.5em"
          fontSize="1.1em"
          p="0.9em"
        />
        <Input
          flex="1"
          placeholder="Contacto"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          size="lg"
          focusBorderColor="teal.400"
          borderColor="teal.300"
          _hover={{ borderColor: 'teal.500' }}
          transition="border-color 0.3s"
          borderRadius="0.5em"
          fontSize="1.1em"
          p="0.9em"
        />
        <Button
          onClick={addSupplier}
          isLoading={loading}
          colorScheme="teal"
          size="lg"
          borderRadius="2em"
          px="2.2em"
          py="1em"
          fontWeight="bold"
          fontSize="1.1em"
          _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
          transition="all 0.2s"
        >
          Agregar
        </Button>
      </Stack>

      <Divider mb="1.5em" borderColor="teal.300" />

      <Heading
        size="lg"
        mb="1.5em"
        color="teal.600"
        fontWeight="semibold"
        textAlign="center"
        fontSize={{ base: '1.6em', md: '2em' }}
      >
        Lista de Proveedores
      </Heading>

      {loading ? (
        <Flex justifyContent="center" py="3em">
          <Spinner size="xl" thickness="4px" speed="0.8s" color="teal.400" />
        </Flex>
      ) : suppliers.length === 0 ? (
        <Text
          color="gray.500"
          fontStyle="italic"
          textAlign="center"
          fontSize="1.2em"
        >
          No hay proveedores registrados
        </Text>
      ) : (
        <Box
          flex="1"
          overflowY="auto"
          maxH="60vh"
          pr="0.5em"
          bg={scrollBg}
          borderRadius="0.8em"
          boxShadow="inner"
          px="1.5em"
          py="2em"
        >
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing="1.5em"
            minChildWidth="14em"
          >
            {suppliers.map(({ _id, name, contact }) => (
              <MotionBox
                key={_id}
                bg={bgCard}
                border={`0.1em solid ${borderCard}`}
                borderRadius="1em"
                p="1.5em"
                boxShadow="md"
                cursor="pointer"
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 12px 25px rgba(0, 128, 128, 0.35)',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Text
                  fontWeight="bold"
                  fontSize="1.4em"
                  mb="0.5em"
                  color="teal.700"
                  noOfLines={1}
                >
                  {name}
                </Text>
                <Text fontSize="1.1em" color="gray.600">
                  <Text as="span" fontWeight="semibold" color="teal.500">
                    Contacto:
                  </Text>{' '}
                  {contact}
                </Text>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  )
}
