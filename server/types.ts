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
   boardID: string
   subtasks: ISubTask[]
}

export interface ISubTask {
   _id: string
   title: string
   isCompleted: boolean
   status: string
   boardID: string
}
