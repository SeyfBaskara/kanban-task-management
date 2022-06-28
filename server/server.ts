import 'dotenv/config'
import app from './src/index'
import { errorHandler } from './src/middleware/ErrorHandler'

const PORT = process.env.PORT || 5001

const server = app.listen(PORT, (): void => {
   console.log(`Server is listening on port ${PORT}`)
})

process.on('unhandledRejection', (reason: Error | any) => {
   console.log(`Unhandled Rejection: ${reason}`)
   server.close(() => process.exit(1))
})

process.on('uncaughtException', (error: Error) => {
   console.log(`Uncaught Exception: ${error.message}`)

   errorHandler.handleError(error)
})
