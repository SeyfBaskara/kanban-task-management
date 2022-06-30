import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { IBoard } from '../../types'

const BoardSchema = new Schema<IBoard>({
   _id: { type: String, default: uuidv4 },
   name: {
      type: String,
      required: true,
      unique: true,
   },
   columns: [{ type: String, unique: true, ref: 'Column' }],
})

const Board = model<IBoard>('Board', BoardSchema)

export default Board
