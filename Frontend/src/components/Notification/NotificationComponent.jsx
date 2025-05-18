import React from 'react'
import { Card, CardBody, Text } from '@chakra-ui/react'

const NotificationComponent = ({ message, type }) => {
  return (
    <Card mb={6} bg="#D9D9D9" color="#284B63">
      <CardBody>
        <Text>{message}</Text>
      </CardBody>
    </Card>
  )
}

export default NotificationComponent