import { NextFunction, Request, Response } from 'express'
import { AppError, HttpCode } from '../utils/AppError'
import Board from '../models/Board'
import Column from '../models/Column'

export const createBoard = async (req: Request, res: Response, next: NextFunction) => {
   const { name } = req.body

   const newBoard = new Board({ name })

   try {
      await newBoard.save()
      res.status(201).json(newBoard)
   } catch (error) {
      next(error)
   }
}

export const getBoard = async (_req: Request, res: Response, next: NextFunction) => {
   try {
      const boards = await Board.find({}).populate({ path: 'columns' })

      res.status(200).json(boards)
   } catch (error) {
      next(error)
   }
}

export const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const board = await Board.findByIdAndDelete(req.params.id)

      if (!board) {
         throw new AppError({
            httpCode: HttpCode.NOT_FOUND,
            description: 'Board is not found',
         })
      }

      await Column.deleteMany({ boardID: req.params.id })
      res.status(200).json(board)
   } catch (error) {
      next(error)
   }
}
