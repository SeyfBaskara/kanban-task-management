import express, { Express, Request, Response } from 'express'
import cors from 'cors'

const app: Express = express()
app.use(express.json())
app.use(cors())

app.get('/', (_req: Request, res: Response) => {
   res.send('Basic setup')
})

export default app
