import { useEffect, useState } from 'react'
import axios from 'axios'
import {Card,CardHeader,CardBody,Heading,Box,} from '@chakra-ui/react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export const ProductStats = () => {
  const [stats, setStats] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:3636/report/product-statistics')
        const adaptedData = res.data.mostMovedProducts.map(prod => ({
          nombre: prod.name,
          movimientos: prod.totalEntrys
        }))
        setStats(adaptedData)
      } catch (error) {
        console.error("Error al cargar estadísticas:", error)
      }
    }
    fetchStats()
  }, [])

  return (
    <Card p={5} shadow="md" borderWidth="1px" mt={5}>
      <CardHeader>
        <Heading size="md">Estadísticas de Productos</Heading>
      </CardHeader>
      <CardBody>
        <Box w="100%" h="300px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats}>
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="movimientos" fill="#3182ce" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardBody>
    </Card>
  )
}
