import 'dotenv/config'
import http from 'http'
import { createHttpTerminator } from 'http-terminator'
import app from './src/index'
import './src/utils/process'

const PORT = process.env.PORT || 5001

export const server = http.createServer(app)
export const httpTerminator = createHttpTerminator({ server })

server.listen(PORT, (): void => {
   console.log(`Server is listening on port ${PORT}`)
})

// process.on('unhandledRejection', (reason: Error | any) => {
//    console.log(`Unhandled Rejection: ${reason}`)
//    server.close(() => process.exit(1))
// })

// process.on('uncaughtException', (error: Error) => {
//    console.log(`Uncaught Exception: ${error.message}`)
//    errorHandler.handleError(error)
//    server.close(() => process.exit(1))
// })
