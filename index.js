import { initServer } from "./configs/app.js"
import { config } from "dotenv"
import { connect } from "./configs/mongo.js"
import { createAdmin } from "./src/User/user.controller.js"


config()
initServer()
connect()
createAdmin()
