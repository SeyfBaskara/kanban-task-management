import { NextFunction, Request, Response } from 'express'
import Board from '../models/Board'

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
