import { useState } from 'react'
import axios from 'axios'
import {Box,Card,CardHeader,CardBody,Heading,Table,Thead,Tbody,Tr,Th,Td,Input,Button,Stack,Text,} from '@chakra-ui/react'

export const InventoryMovements = () => {
  const [movements, setMovements] = useState([])
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const searchMovements = async () => {
    try {
      const res = await axios.get('http://localhost:3636/entry/movements')
      const filteredMovements = res.data.Entrys.filter((mov) => {
        const movementDate = new Date(mov.Date)
        const fromDateObj = fromDate ? new Date(fromDate) : null
        const toDateObj = toDate ? new Date(toDate) : null
        return (!fromDateObj || movementDate >= fromDateObj) && (!toDateObj || movementDate <= toDateObj)
      })
      setMovements(filteredMovements)
    } catch (err) {
      console.error("Error al obtener movimientos:", err)
    }
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString()
  }

  return (
    <Card p={5} shadow="md" borderWidth="1px" mt={5}>
      <CardHeader>
        <Heading size="md">Movimientos del Inventario</Heading>
      </CardHeader>
      <CardBody>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={4}>
          <Box>
            <Text mb="8px">Desde:</Text>
            <Input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
          </Box>
          <Box>
            <Text mb="8px">Hasta:</Text>
            <Input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
          </Box>
          <Box alignSelf="end">
            <Button colorScheme="teal" onClick={searchMovements}>Buscar</Button>
          </Box>
        </Stack>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Fecha</Th>
              <Th>Tipo</Th>
              <Th>Producto</Th>
              <Th isNumeric>Cantidad</Th>
              <Th>Empleado</Th>
              <Th>Razón (si aplica)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {movements.map((m, i) => (
              <Tr key={i}>
                <Td>{formatDate(m.Date)}</Td>
                <Td>{m.type === "entry" ? "Entrada" : "Salida"}</Td>
                <Td>{m.product.name}</Td>
                <Td isNumeric>{m.quantity}</Td>
                <Td>{m.employee.name}</Td>
                <Td>{m.type === "exit" ? m.reason || "Sin razón" : "-"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  )
}
