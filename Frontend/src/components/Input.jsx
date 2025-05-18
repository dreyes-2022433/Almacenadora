import React from 'react'
import { FormControl, FormLabel, Input as ChakraInput } from '@chakra-ui/react'

export const Input = ({ field, label, value, onChangeHandler, type, onBlurHandler }) => {
  const handleValueChange = (e) => {
    onChangeHandler(e.target.value, field)
  }

  const handleBlur = (e) => {
    onBlurHandler(e.target.value, field)
  }

  return (
    <FormControl>
      <FormLabel htmlFor={field} className="auth-form-label">{label}</FormLabel>
      <ChakraInput
        id={field}
        type={type}
        name={field}
        value={value}
        onChange={handleValueChange}
        onBlur={handleBlur}
      />
    </FormControl>
  )
}