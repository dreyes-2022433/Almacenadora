'use strict'


import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import authClient from '../src/Client/client.routes.js'
import authSupplier from '../src/Supplier/supplier.routes.js'
import authProduct from '../src/Products/product.routes.js'
import authUser from '../src/User/user.routes.js'
import authReport from '../src/Report/report.routes.js'
import authEntry from '../src/Entry/entry.routes.js'


const configs = (app)=>{
    app.use(express.json()) //Aceptar y enviar datos en JSON
    app.use(express.urlencoded({extended: false})) //No encriptar la URL
    app.use(cors())
    app.use(helmet())
   // app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/client',authClient)
    app.use('/supplier',authSupplier)
    app.use('/product',authProduct)
    app.use('/user',authUser)
    app.use('/report',authReport)
    app.use('/entry',authEntry)


}

export const initServer = async()=>{
    const app = express() //Instancia de express
    try{
        configs(app) //Aplicar configuraciones al servidor
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        
        console.error('Server init failed', err)
    }
}
