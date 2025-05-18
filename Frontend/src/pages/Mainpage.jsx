import React from 'react'
import './MainPage.css'

export const Home = () => {
  return (
    <>
      <div className="background-image">
        <header>
          <h1>ALMACEN KINAL</h1>
          <nav>
            <a href="#">Inicio</a>
            <a href="#">Productos</a>
            <a href="#">Servicios</a>
            <a href="#">Contacto</a>
            <a href="/reports">Reportes</a>
          </nav>
        </header>

        <div className="content">
          <div className="content-card">
            <h2>ALMACEN</h2>
          </div>
        </div>
      </div>
    </>
  )
}