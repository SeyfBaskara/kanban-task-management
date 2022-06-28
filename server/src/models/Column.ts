import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { Icolumn } from '../../types'

const columnSchema = new Schema<IColumn>({
   _id: { type: String, default: uuidv4 },
   name: {
      type: String,
      required: true,
   },
})

const Column = model<IColumn>('Column', columnSchema)

export default Column
