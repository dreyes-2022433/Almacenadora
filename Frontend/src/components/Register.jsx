import React,{ useState } from "react"
import { useRegister } from "../shared/hooks/useRegister"
import { validateEmail, validateName, validatePassConfirm, validatePassword, validatePhone, validateUsername } from "../shared/validators/validators.js"
import { emailValidationMessage, passConfirmValidationMessage, passwordValidationMessage, phoneValidationMessage, usernameValidationMessage } from "../shared/validators/validators.js"
import { Input } from "./input"



export const Register = ({handleIsLogin}) => {

    const form = {
        name: {
            value: '',
            isValid: false,
            showError: false
        },
        
        email: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        },
        
        passwordConfirm: {
            value: '',
            isValid: false,
            showError: false
        }
    }

    const [formData, setFormData] = useState(form)

    const {register} = useRegister()
                    
    const isSubmitButtonDisabled = 
    !formData.name.isValid ||
    !formData.email.isValid ||
    !formData.password.isValid ||
    !formData.passwordConfirm.isValid
  
    
    const handleRegister = (e)=>{
        e.preventDefault()
        register(
            formData.name.value,
            formData.email.value,
            formData.password.value,
      
            

    
        )
    }

    const handleValidationOnBlur = (value, field)=>{
        let isValid = false
        switch (field) {
            case 'name':
                isValid = validateName(value)
                break;
            case 'email':
                isValid = validateEmail(value)
                break;
            case 'password':
                isValid = validatePassword(value)
                break;
            case 'passwordConfirm':
                isValid = validatePassConfirm(formData.password.value, value)
                break;
            default:
                break;
        }
        setFormData((prevData)=> (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    isValid,
                    showError: !isValid
                }
            }
        ))
    }

    //Función manejadora de cambios del estado
                        //nuevo valor //Input que cambió
    const handleValueChange = (value, field)=>{
        setFormData((prevData)=> (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    value
                }
            }
        ))
        console.log(formData)
    }

    return (
        <div className='register-container'>
            <h1>REGISTRAR</h1>
        <form
            id='formulario'
            className='auth-form' 
            onSubmit={handleRegister}
        >
            <Input
                field='name'
                label='Name'
                value={formData.name.value}
                type='text'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.name.showError}
                validationMessage={'El nombre debe tener entre 3 y 8 caracteres (Sin espacios)'}
                /> 
            

            <Input 
                field='email'
                label='Email'
                value={formData.email.value}
                type='email'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.email.showError}
                validationMessage={emailValidationMessage}
            />

            <Input 
                field='password'
                label='Password'
                value={formData.password.value}
                type='password'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.password.showError}
                validationMessage={passwordValidationMessage}
            />

            <Input 
                field='passwordConfirm'
                label='Password Confirmation'
                value={formData.passwordConfirm.value}
                type='password'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.passwordConfirm.showError}
                validationMessage={passConfirmValidationMessage}
            />  
                <button type="submit" disabled={isSubmitButtonDisabled} >Registrarse</button>
                <button onClick={handleIsLogin}>Volver a Login</button>
            </form>
        </div>
    )
}