import axios from 'axios'

const url = 'https://kanban-task-managment.herokuapp.com/api/board'
const urlTask = 'https://kanban-task-managment.herokuapp.com/api/task'

interface IProps {
   name: string
   id?: string
   boardID?: string
}
interface ITaskProps {
   title: string
   description: string
   status: string
   boardID: string
}

// BOARDS
export const fetchBoards = () => axios.get(url)
export const createBoard = (newboard: IProps) => axios.post(`${url}/create`, newboard)
export const deleteBoard = (id: string) => axios.delete(`${url}/delete/${id}`)
export const updateBoard = (id: string, updateBoard: IProps) =>
   axios.patch(`${url}/update/${id}`, updateBoard)

// COLUMNS
export const createColumn = (newColumn: IProps) => axios.post(`${url}/create/column`, newColumn)
export const deleteColumn = (id: string) => axios.delete(`${url}/delete/column/${id}`)

//TASKS
export const createTask = (newTask: ITaskProps) => axios.post(`${urlTask}/create`, newTask)
