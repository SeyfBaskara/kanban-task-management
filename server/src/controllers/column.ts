import { NextFunction, Request, Response } from 'express'
import { AppError, HttpCode } from '../utils/AppError'
import Column from '../models/Column'
import Board from '../models/Board'

export const createColumn = async (req: Request, res: Response, next: NextFunction) => {
   const { name, boardID } = req.body

   const newColumn = new Column({ name, boardID })

   try {
      await newColumn.save()
      await Board.findOneAndUpdate(
         { boardID: newColumn.boardID },
         { $push: { columns: newColumn } },
         { new: true, runValidators: true }
      )
      res.status(201).json(newColumn)
   } catch (error) {
      next(error)
   }
}

export const updateColumn = async (req: Request, res: Response, next: NextFunction) => {
   const updates = Object.keys(req.body)
   const allowUpdates = ['name']
   const isValidoperation = updates.every((update) => allowUpdates.includes(update))

   try {
      if (!isValidoperation) {
         throw new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: 'Invalid value field updates!',
         })
      }

      const column = await Column.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

      if (!column) {
         throw new AppError({
            httpCode: HttpCode.NOT_FOUND,
            description: 'Column is not found!',
         })
      }

      res.status(201).json(column)
   } catch (error) {
      next(error)
   }
}

export const deleteColumn = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const column = await Column.findOne({ _id: req.params.id })

      if (!column) {
         throw new AppError({
            httpCode: HttpCode.NOT_FOUND,
            description: 'Column is not found',
         })
      }

      await column.deleteOne()

      res.status(200).json(column)
   } catch (error) {
      next(error)
   }
}
