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
   tasks?: ITasks[]
}

interface ITasks {
   title: string
   description: string
   status: string
}
