import { Response } from 'express'
import { AppError, HttpCode } from '../utils/AppError'
import { exitHandler } from '../utils/ExitHandler'

class ErrorHandler {
   public handleError(error: Error | AppError, response?: Response): void {
      if (this.isTrustedError(error) && response) {
         this.handleTrustedError(error as AppError, response)
      } else {
         this.handleCriticalError(error, response)
      }
   }

   public isTrustedError(error: Error): boolean {
      if (error instanceof AppError) {
         return error.isOperational
      }

      return false
   }

   private handleTrustedError(error: AppError, response: Response): void {
      response.status(error.httpCode).json({ message: error.message })
   }

   private handleCriticalError(error: Error | AppError, response?: Response): void {
      const { code }: any = error

      if (code === 11000) {
         response?.status(HttpCode.BAD_REQUEST).json({ message: 'Duplicate filed value added' })
      } else {
         response?.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
      }

      console.log('Application encountered a critical error. Exiting')
      console.log(error)
      exitHandler.handleExit(1)
   }
}

export const errorHandler = new ErrorHandler()
