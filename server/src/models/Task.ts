import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { ITask } from '../../types'
import SubTask from './SubTask'
import Column from './Column'

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
   subtasks: [{ type: String, ref: 'SubTask' }],
})

TaskSchema.post('save', async function (next: any) {
   await Column.findOneAndUpdate({ name: this.status }, { $push: { tasks: this } }, { new: true, runValidators: true })
   next()
})

TaskSchema.pre('deleteOne', { document: true }, async function (next: any) {
   await SubTask.deleteMany({ status: this.status })
   next()
})

const Task = model<ITask>('Task', TaskSchema)
export default Task
