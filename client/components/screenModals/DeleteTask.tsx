import React from 'react'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { setIsDeleteTask, setIsLightbox, setIsSelected } from 'app/features/boardSlice'

const DeleteTask: React.FC = () => {
   const { isDeleteTask, boards, isSelected } = useAppSelector((state) => state.board)
   const dispatch = useAppDispatch()

   const handleDeleteTask = () => {
      dispatch(setIsDeleteTask(false))
      dispatch(setIsLightbox(false))
   }

   const handleCancelDeleteTask = () => {
      dispatch(setIsDeleteTask(false))
      dispatch(setIsLightbox(false))
   }

   return (
      <section
         className={`${
            isDeleteTask
               ? 'fixed flex flex-col gap-5 top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-darkGrey w-5/6 p-4 rounded sm:w-96 z-50'
               : 'hidden'
         }`}
      >
         <div className="flex flex-col gap-5">
            <h1 className="font-bold text-xl text-red">Delete this task?</h1>
            <p className="text-mediumGrey text-sm">
               Are you sure you want to delete the 'Build setting UI' Task? This action will remove all columns and tasks and
               cannot be reversed.
            </p>
         </div>
         <div className="flex flex-col gap-4 sm:flex-row">
            <button
               onClick={handleDeleteTask}
               className="p-1.5 text-white bg-red rounded-full w-full font-semibold hover:bg-redHover"
            >
               Delete
            </button>
            <button
               onClick={handleCancelDeleteTask}
               className="p-1.5 text-purple bg-linesLight dark:bg-white rounded-full w-full font-semibold hover:bg-purpleHover hover:text-white"
            >
               Cancel
            </button>
         </div>
      </section>
   )
}

export default DeleteTask
