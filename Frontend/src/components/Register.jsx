import React, { useState } from 'react'
import { useRegister } from '../shared/hooks/useRegister'
import { validateEmail, validateName, validatePassConfirm, validatePassword } from '../shared/validators/validators.js'
import { Input } from './input'
import { Heading, VStack, Button } from '@chakra-ui/react'

export const Register = ({ handleIsLogin }) => {
  const form = {
    name: {
      value: '',
      isValid: false,
      showError: false,
    },
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
    passwordConfirm: {
      value: '',
      isValid: false,
      showError: false,
    },
  }

  const [formData, setFormData] = useState(form)

  const { register } = useRegister()

  const isSubmitButtonDisabled =
    !formData.name.isValid ||
    !formData.email.isValid ||
    !formData.password.isValid ||
    !formData.passwordConfirm.isValid

  const handleRegister = (e) => {
    e.preventDefault()
    register(formData.name.value, formData.email.value, formData.password.value)
  }

  const handleValidationOnBlur = (value, field) => {
    let isValid = false
    switch (field) {
      case 'name':
        isValid = validateName(value)
        break
      case 'email':
        isValid = validateEmail(value)
        break
      case 'password':
        isValid = validatePassword(value)
        break
      case 'passwordConfirm':
        isValid = validatePassConfirm(formData.password.value, value)
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
      className="auth-form register-form"
      style={{
        marginTop: 'auto',
        marginBottom: 'auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <Heading as="h1" size="xl" mb={6} color="#284B63">
        Registrarse
      </Heading>
      <form id="formulario" onSubmit={handleRegister}>
        <VStack spacing={1} align="stretch">
          <Input
            field="name"
            label="Nombre"
            value={formData.name.value}
            type="text"
            onChangeHandler={handleValueChange}
            onBlurHandler={handleValidationOnBlur}
          />
          <Input
            field="email"
            label="Email"
            value={formData.email.value}
            type="email"
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
          <Input
            field="passwordConfirm"
            label="Confirmar Contraseña"
            value={formData.passwordConfirm.value}
            type="password"
            onChangeHandler={handleValueChange}
            onBlurHandler={handleValidationOnBlur}
          />
          <Button type="submit" isDisabled={isSubmitButtonDisabled}>
            Registrarse
          </Button>
          <Button variant="link" onClick={handleIsLogin} className="auth-form-switch-label">
            Volver a Login
          </Button>
        </VStack>
      </form>
    </div>
  )
}