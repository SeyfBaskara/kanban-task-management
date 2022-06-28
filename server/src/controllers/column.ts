import { NextFunction, Request, Response } from 'express'
import Column from '../models/Column'
import Board from '../models/Board'

export const createColumn = async (req: Request, res: Response, next: NextFunction) => {
   const { name } = req.body

   const newColumn = new Column({ name, boardID: req.params.id })

   try {
      await newColumn.save()
      await Board.findByIdAndUpdate(req.params.id, { $push: { columns: newColumn } }, { new: true, runValidators: true })
      res.status(201).json(newColumn)
   } catch (error) {
      next(error)
   }
}
