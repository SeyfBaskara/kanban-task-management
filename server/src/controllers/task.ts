import { AppError, HttpCode } from '../utils/AppError'
import { NextFunction, Request, Response } from 'express'
import Task from '../models/Task'

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
   const { title, description, status } = req.body

   const newTask = new Task({ title, description, status })

   try {
      await newTask.save()

      res.status(201).json(newTask)
   } catch (error) {
      next(error)
   }
}

export const getTasks = async (_req: Request, res: Response, next: NextFunction) => {
   try {
      const task = await Task.find()

      if (!task) {
         throw new AppError({
            httpCode: HttpCode.NOT_FOUND,
            description: 'Task is not found',
         })
      }

      res.status(200).json(task)
   } catch (error) {
      next(error)
   }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
   const updates = Object.keys(req.body)
   const allowUpdates = ['title', 'description', 'status']
   const isValidoperation = updates.every((update) => allowUpdates.includes(update))

   try {
      if (!isValidoperation) {
         throw new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: 'Invalid task value field update! ',
         })
      }

      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

      if (!task) {
         throw new AppError({
            httpCode: HttpCode.NOT_FOUND,
            description: 'Task is not found',
         })
      }

      res.status(201).json(task)
   } catch (error) {
      next(error)
   }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const task = await Task.findOne({ _id: req.params.id })

      if (!task) {
         throw new AppError({
            httpCode: HttpCode.NOT_FOUND,
            description: 'Task is not found',
         })
      }

      await task.deleteOne()
      res.status(200).json(task)
   } catch (error) {
      next(error)
   }
}
