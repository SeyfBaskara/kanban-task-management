export interface IBoard {
   _id: string
   name: string
   columns: IColumn[]
}
export interface IColumn {
   _id: string
   name: string
   boardID: string
   tasks: ITask[]
}

export interface ITask {
   _id: string
   title: string
   description: string
   status: string
}

export interface ISubTask {
   _id: string
   title: string
   isCompleted: boolean
}
