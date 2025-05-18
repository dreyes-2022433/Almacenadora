import { useEffect, useState } from 'react'
import axios from 'axios'
import {Box,Card,CardHeader,CardBody,Heading,Table,Thead,Tbody,Tr,Th,Td,Text,Stat,StatLabel,StatNumber,Stack,} from '@chakra-ui/react'

export const InventoryReport = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get("http://localhost:3636/report/inventory-report")
        setProducts(res.data.products)
      } catch (error) {
        console.error("Error al obtener el Inventario:", error)
      }
    }
    fetchInventory()
  }, [])

  const totalQuantity = products.reduce((sum, p) => sum + p.stock, 0)
  const inventoryValue = products.reduce((sum, p) => sum + (p.stock * p.unitPrice), 0)

  return (
    <Card p={5} shadow="md" borderWidth="1px">
      <CardHeader>
        <Heading size="md">Informe de Inventario</Heading>
      </CardHeader>
      <CardBody>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Producto</Th>
              <Th>Categoria</Th>
              <Th isNumeric>Cantidad</Th>
              <Th isNumeric>Precio</Th>
              <Th isNumeric>Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((p, i) => (
              <Tr key={i}>
                <Td>{p.name}</Td>
                <Td>{p.category}</Td>
                <Td isNumeric>{p.stock}</Td>
                <Td isNumeric>Q{p.unitPrice}</Td>
                <Td isNumeric>Q{(p.stock * p.unitPrice).toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Stack direction="row" spacing={10} mt={5}>
          <Stat>
            <StatLabel>Total productos en stock</StatLabel>
            <StatNumber>{totalQuantity}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Valor total del inventario</StatLabel>
            <StatNumber>Q{inventoryValue.toFixed(2)}</StatNumber>
          </Stat>
        </Stack>
      </CardBody>
    </Card>
  )
}
