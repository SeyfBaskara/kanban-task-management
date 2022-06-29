import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import connectDB from './database/db'
import boardRouter from './routers/boardRouter'
import taskRouter from './routers/taskRouter'
import { errorHandler } from './middleware/ErrorHandler'

connectDB()
const app: Application = express()
app.use(express.json())
app.use(cors())

app.get('/', async (_req: Request, res: Response) => {
   res.send('Basic setup')
})

app.use('/api/board', boardRouter)
app.use('/api/task', taskRouter)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
   console.log('Error encountered:', err.message || err)
   errorHandler.handleError(err, res)
})

export default app
