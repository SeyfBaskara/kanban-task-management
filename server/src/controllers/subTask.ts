import { NextFunction, Request, Response } from 'express'
import { AppError, HttpCode } from '../utils/AppError'
import SubTask from '../models/SubTask'

export const createSubtask = async (req: Request, res: Response, next: NextFunction) => {
   const { title, isCompleted } = req.body

   const newSubtask = new SubTask({ title, isCompleted })

   try {
      await newSubtask.save()

      res.status(201).json(newSubtask)
   } catch (error) {
      next(error)
   }
}

export const getSubtasks = async (_req: Request, res: Response, next: NextFunction) => {
   try {
      const subtask = await SubTask.find()

      if (!subtask) {
         throw new AppError({
            httpCode: HttpCode.NOT_FOUND,
            description: 'Subtask is not found',
         })
      }

      res.status(200).json(subtask)
   } catch (error) {
      next(error)
   }
}

export const updateSubtask = async (req: Request, res: Response, next: NextFunction) => {
   const updates = Object.keys(req.body)
   const allowUpdates = ['title', 'isCompleted']
   const isValidoperation = updates.every((update) => allowUpdates.includes(update))

   try {
      if (!isValidoperation) {
         throw new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: 'Invalid subtask value field update! ',
         })
      }

      const subtask = await SubTask.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

      if (!subtask) {
         throw new AppError({
            httpCode: HttpCode.NOT_FOUND,
            description: 'Subtask is not found',
         })
      }

      res.status(201).json(subtask)
   } catch (error) {
      next(error)
   }
}

export const deleteSubtask = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const subtask = await SubTask.findByIdAndDelete(req.params.id)

      if (!subtask) {
         throw new AppError({
            httpCode: HttpCode.NOT_FOUND,
            description: 'Subtask is not found',
         })
      }

      res.status(200).json(subtask)
   } catch (error) {
      next(error)
   }
}
