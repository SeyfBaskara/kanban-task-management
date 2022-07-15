import axios from 'axios'

const url = 'http://localhost:5000/api/board'

interface IProps {
   name: string
}

export const fetchBoards = () => axios.get(url)
export const createBoard = (newboard: IProps) => axios.post(`${url}/create`, newboard)
