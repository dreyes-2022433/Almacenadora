import React, { useEffect, useState } from 'react'
import { Register } from '../components/Register'
import { Login } from '../components/login'
import './AuthPage.css'

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  const handleIsLogin = () => {
    setIsLogin((prev) => !prev)
  }

  useEffect(() => {
    // Añadir la clase al entrar
    document.body.classList.add('no-scroll')

    // Quitarla al salir
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])

  return (
    <div className="auth-page">
      {isLogin ? (
        <Login handleIsLogin={handleIsLogin} />
      ) : (
        <Register handleIsLogin={handleIsLogin} />
      )}
    </div>
  )
}
