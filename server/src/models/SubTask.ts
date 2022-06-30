import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { ISubTask } from '../../types'

const SubTaskSchema = new Schema<ISubTask>({
   _id: { type: String, default: uuidv4 },
   title: {
      type: String,
      required: true,
      unique: true,
   },
   isCompleted: {
      type: Boolean,
   },
   status: {
      type: String,
      required: true,
      lowercase: true,
   },
})

const SubTask = model<ISubTask>('SubTask', SubTaskSchema)

export default SubTask
