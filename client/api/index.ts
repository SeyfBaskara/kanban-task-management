import axios from 'axios'

const url = 'http://localhost:5000/api/board'

interface IProps {
   name: string
   id?: string
   boardID?: string
}

export const fetchBoards = () => axios.get(url)
export const createBoard = (newboard: IProps) => axios.post(`${url}/create`, newboard)
export const deleteBoard = (id: string) => axios.delete(`${url}/delete/${id}`)
export const updateBoard = (id: string, updateBoard: IProps) => axios.patch(`${url}/update/${id}`, updateBoard)
