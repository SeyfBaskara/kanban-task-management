import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { ITask } from '../../types'
import SubTask from './SubTask'

const TaskSchema = new Schema<ITask>({
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
   boardID: {
      type: String,
   },
   subtasks: [{ type: String, ref: 'SubTask' }],
})

TaskSchema.pre('deleteOne', { document: true }, async function (next: any) {
   await SubTask.deleteMany({ status: this.status })
   next()
})

TaskSchema.set('toJSON', {
   transform: function (_doc, ret, _options) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
   },
})

const Task = model<ITask>('Task', TaskSchema)
export default Task
