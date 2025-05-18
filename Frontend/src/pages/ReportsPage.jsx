import { InventoryReport } from '../components/Reports/InventoryReport'
import { InventoryMovements } from '../components/Reports/InventoryMovements'
import { ProductStats } from '../components/Reports/ProductStats'

import './ReportsPage.css'

export const ReportsPage = () => {
  return (
    <>
      <header className="reports-header">
        <h1>ALMACEN KINAL</h1>
        <nav>
          <a href="/Home">Inicio</a>
          <a href="#">Productos</a>
          <a href="#">Servicios</a>
          <a href="#">Contacto</a>
        </nav>
      </header>

      <div className="reportes-container">
        <h1>Informes y Estadísticas</h1>
        <InventoryReport />
        <hr />
        <InventoryMovements />
        <hr />
        <ProductStats />
      </div>
    </>
  )
}
