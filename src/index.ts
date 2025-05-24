import express, { Express } from "express";
import 'dotenv/config';
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/user.routes.js";
import './database/database.js'

const app: Express = express()

app.set('port', process.env.PORT || 4000)
app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}`)
})

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/api', userRouter)