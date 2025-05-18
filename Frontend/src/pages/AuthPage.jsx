import React, { useState } from 'react'
import { Register } from '../components/Register'
import { Login } from '../components/login'
import './AuthPage.css'

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  const handleIsLogin = () => {
    setIsLogin((prev) => !prev)
  }

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