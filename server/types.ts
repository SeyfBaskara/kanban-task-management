export interface IBoard {
   _id: string
   name: string
   columns: IColumn[]
}
export interface IColumn {
   _id: string
   name: string
   boardID: string
}
