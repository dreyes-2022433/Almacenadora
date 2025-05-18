import React, { useState } from 'react'
import { useLogin } from '../shared/hooks/useLogin'
import { validateEmail, validatePassword } from '../shared/validators/validators.js'
import { Input } from './input'
import { Heading, VStack, Button } from '@chakra-ui/react'

export const Login = ({ handleIsLogin }) => {
  const form = {
    email: {
      value: '',
      isValid: false,
      showError: false,
    },
    password: {
      value: '',
      isValid: false,
      showError: false,
    },
  }

  const [formData, setFormData] = useState(form)

  const { login } = useLogin()

  const isSubmitButtonDisabled = !formData.email.isValid || !formData.password.isValid

  const handleLogin = (e) => {
    e.preventDefault()
    login(formData.email.value, formData.password.value)
  }

  const handleValidationOnBlur = (value, field) => {
    let isValid = false
    switch (field) {
      case 'email':
        isValid = validateEmail(value)
        break
      case 'password':
        isValid = validatePassword(value)
        break
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        isValid,
      },
    }))
  }

  const handleValueChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        value,
      },
    }))
  }

  return (
    <div
      className="auth-form"
      style={{
        transform: 'none', // Evita el movimiento al pasar el mouse
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)', // Sombra fija
        marginTop: '2rem', // Mantiene el margen original
      }}
    >
      <Heading as="h1" size="md" mb={4} color="#1A3C5A" fontFamily="'Poppins', sans-serif">
        Iniciar Sesión
      </Heading>
      <form id="formulario" onSubmit={handleLogin}>
        <VStack spacing={2} align="stretch">
          <Input
            field="email"
            label="Email"
            value={formData.email.value}
            type="text"
            onChangeHandler={handleValueChange}
            onBlurHandler={handleValidationOnBlur}
          />
          <Input
            field="password"
            label="Contraseña"
            value={formData.password.value}
            type="password"
            onChangeHandler={handleValueChange}
            onBlurHandler={handleValidationOnBlur}
          />
          <Button type="submit" isDisabled={isSubmitButtonDisabled}>
            Iniciar Sesión
          </Button>
          <Button variant="link" onClick={handleIsLogin} className="auth-form-switch-label">
            ¿No tienes cuenta? Regístrate
          </Button>
        </VStack>
      </form>
    </div>
  )
}