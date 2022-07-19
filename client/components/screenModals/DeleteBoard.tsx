import React from 'react'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { setIsDeleteBoard, setIsLightbox } from 'app/features/boardSlice'

const DeleteBoard: React.FC = () => {
   const { isDeleteBoard, boards, isSelected } = useAppSelector((state) => state.board)
   const dispatch = useAppDispatch()

   const handleDeleteBoard = () => {
      dispatch(setIsDeleteBoard(false))
      dispatch(setIsLightbox(false))
   }

   const handleCancelDeleteBoard = () => {
      dispatch(setIsDeleteBoard(false))
      dispatch(setIsLightbox(false))
   }

   return (
      <section
         className={`${
            isDeleteBoard
               ? 'fixed flex flex-col gap-5 top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2 bg-white w-5/6 p-4 rounded sm:w-96 z-50'
               : 'hidden'
         }`}
      >
         <div className="flex flex-col gap-5">
            <h1 className="font-bold text-xl text-red">Delete this board?</h1>
            <p className="text-mediumGrey text-sm">
               Are you sure you want to delete the '{boards[isSelected].name}' board? This action will remove all columns and
               tasks and cannot be reversed.
            </p>
         </div>
         <div className="flex flex-col gap-4 sm:flex-row">
            <button
               onClick={handleDeleteBoard}
               className="p-1.5 text-white bg-red rounded-full w-full font-semibold hover:bg-redHover"
            >
               Delete
            </button>
            <button
               onClick={handleCancelDeleteBoard}
               className="p-1.5 text-purple bg-linesLight rounded-full w-full font-semibold hover:bg-purpleHover hover:text-white"
            >
               Cancel
            </button>
         </div>
      </section>
   )
}

export default DeleteBoard
