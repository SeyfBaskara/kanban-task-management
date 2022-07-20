interface IBoards {
   name: string
   id: string
   boardID: string
   columns?: IColumns[]
}

interface IColumns {
   id: string
   name: string
   boardID: string
}
