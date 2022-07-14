import axios from 'axios'

const url = 'http://localhost:5000/api/board'

export const fetchBoards = () => axios.get(url)
