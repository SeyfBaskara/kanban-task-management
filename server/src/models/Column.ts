import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { IColumn } from '../../types'
import Task from './Task'
import SubTask from './SubTask'

const ColumnSchema = new Schema<IColumn>({
   _id: { type: String, default: uuidv4 },
   name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
   },
   boardID: {
      type: String,
   },
   tasks: [{ type: String, ref: 'Task' }],
})

ColumnSchema.pre('deleteOne', { document: true }, async function (next) {
   await Task.deleteMany({ status: this.name })
   await SubTask.deleteMany({ status: this.name })
   next()
})

const Column = model<IColumn>('Column', ColumnSchema)
export default Column
