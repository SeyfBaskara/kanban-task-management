import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { IBoard } from '../../types'
import Cloumn from './Column'
import Task from './Task'
import SubTask from './SubTask'

const BoardSchema = new Schema<IBoard>({
   _id: { type: String, default: uuidv4 },
   name: {
      type: String,
      required: true,
      unique: true,
   },
   columns: [{ type: String, unique: true, ref: 'Column' }],
})

BoardSchema.pre('deleteOne', { document: true }, async function (next: any) {
   await Cloumn.deleteMany({ boardID: this._id })
   await Task.deleteMany({ boardID: this._id })
   await SubTask.deleteMany({ boardID: this._id })
   next()
})

const Board = model<IBoard>('Board', BoardSchema)
export default Board
