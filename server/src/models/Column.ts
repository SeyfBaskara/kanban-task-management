import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { IColumn } from '../../types'

const columnSchema = new Schema<IColumn>({
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

const Column = model<IColumn>('Column', columnSchema)

// columnSchema.pre('deleteOne', async function (next) {
//    let column: any = this
//    console.log('this is first pre')
//    await column.model('Task').deleteMany({ status: column.name })
//    console.log('this is pre')
//    next()
// })

export default Column
