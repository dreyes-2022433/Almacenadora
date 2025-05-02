'use strict'


import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

const configs = (app)=>{
    app.use(express.json()) //Aceptar y enviar datos en JSON
    app.use(express.urlencoded({extended: false})) //No encriptar la URL
    app.use(cors())
    app.use(helmet())
   // app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app)=>{

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
