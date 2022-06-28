import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { IColumn } from '../../types'

const columnSchema = new Schema<IColumn>({
   _id: { type: String, default: uuidv4 },
   name: {
      type: String,
      required: true,
      unique: true,
   },
   boardID: {
      type: String,
   },
})

const Column = model<IColumn>('Column', columnSchema)

export default Column
