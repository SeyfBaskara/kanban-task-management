import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { ITask } from '../../types'

const taskSchema = new Schema<ITask>({
   _id: { type: String, default: uuidv4 },
   title: {
      type: String,
      required: true,
      unique: true,
   },
   description: {
      type: String,
   },
   status: {
      type: String,
      required: true,
      lowercase: true,
   },
})

const Task = model<ITask>('Task', taskSchema)

export default Task
