import React from 'react'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { setIsDeleteBoard } from 'app/features/boardSlice'

const DeleteBoard: React.FC = () => {
   const { isDeleteBoard } = useAppSelector((state) => state.board)

   console.log(isDeleteBoard)
   return <div>{isDeleteBoard && <p>DeleteBoard</p>}</div>
}

export default DeleteBoard
