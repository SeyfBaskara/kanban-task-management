import React, { useState } from 'react'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { setIsAddBoard, setIsLightbox } from 'app/features/boardSlice'

const AddBoard: React.FC = () => {
   const [board, setBoard] = useState('')
   const { isAddBoard } = useAppSelector((state) => state.board)
   const dispatch = useAppDispatch()

   const handleAddNewColumn = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
   }

   const handleCreateNewBoard = () => {
      dispatch(setIsAddBoard(false))
      dispatch(setIsLightbox(false))
   }

   const handleCloseAddBoardModal = () => {
      dispatch(setIsAddBoard(false))
      dispatch(setIsLightbox(false))
   }

   return (
      <section
         className={`${
            isAddBoard
               ? 'fixed flex flex-col gap-5 top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2 bg-white w-5/6 p-4 rounded sm:w-96 z-50'
               : 'hidden'
         }`}
      >
         <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl">Add New Board</h1>
            <div className="fixed right-2 top-1" onClick={handleCloseAddBoardModal}>
               <Image src="/assets/icon-cross.svg" alt="cross close icon" width={15} height={15} />
            </div>
            <form className="flex flex-col ">
               <label className="text-sm text-mediumGrey mb-1.5">Board Name</label>
               <input
                  className="border-2 p-1 text-sm rounded"
                  type="text"
                  placeholder="e.g Web design"
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
               />
            </form>
         </div>
         <form className="flex flex-col gap-2" onSubmit={handleAddNewColumn}>
            <label className="text-sm text-mediumGrey">Board Cloumns</label>
            <div className="flex gap-3 items-center ">
               <input type="text" list="tasks" className="border-2 w-full p-1 rounded " />
               <datalist id="tasks">
                  <option>Todo</option>
                  <option>Doing</option>
                  <option>Done</option>
               </datalist>
               <div className="relative w-4 h-4">
                  <Image src="/assets/icon-cross.svg" alt="cross delete icon" layout="fill" />
               </div>
            </div>
            <button type="submit" className="p-1.5 text-purple bg-linesLight rounded-full mt-1">
               +Add New Column
            </button>
         </form>
         <div>
            <button className="p-1.5 text-white bg-purple rounded-full w-full" onClick={handleCreateNewBoard}>
               Create New Board
            </button>
         </div>
      </section>
   )
}

export default AddBoard
