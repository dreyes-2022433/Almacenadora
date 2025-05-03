import { getEntryReport, getInventoryReport, getProductStatistics } from "./report.controller.js"


import { Router } from "express"


const api = Router()

api.post("/movement-report", getEntryReport) 
api.get("/inventory-report", getInventoryReport) 
api.get("/product-statistics", getProductStatistics)

export default api