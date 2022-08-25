import React from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setIsAddColumn, setIsLightbox } from 'app/features/boardSlice'

const Board = () => {
   const { boards, isSelected } = useAppSelector((state) => state.board)
   const dispatch = useAppDispatch()

   const handleShowAddNewColumn = () => {
      dispatch(setIsAddColumn(true))
      dispatch(setIsLightbox(true))
   }

   return (
      <article className="bg-lightGrey h-screen overflow-auto dark:bg-veryDarkGrey md:overflow-hidden ">
         {boards[isSelected]?.columns?.length !== 0 ? (
            <div className="flex h-full w-max mt-16 gap-2">
               {boards[isSelected]?.columns?.map((column) => (
                  <div key={column.id} className="w-80 p-2 sm:w-64">
                     <div className="flex-col gap-3 items-center">
                        <div className="flex gap-3 items-center">
                           <div
                              className={`${
                                 column.name === 'todo'
                                    ? 'bg-todoColor'
                                    : column.name === 'doing'
                                    ? 'bg-doingColor'
                                    : column.name === 'done'
                                    ? 'bg-doneColor'
                                    : 'bg-red'
                              } rounded-full w-3 h-3`}
                           ></div>
                           <h1 className="uppercase text-sm font-semibold text-mediumGrey">
                              {column.name} ({column.tasks?.length})
                           </h1>
                        </div>
                        {column.tasks?.map(
                           (task, index) =>
                              column.name === task.status && (
                                 <div className="mt-3" key={index}>
                                    <div className="bg-white dark:bg-darkGrey rounded p-4">
                                       <p className="font-bold">{task.title}</p>
                                       <p className="text-mediumGrey text-sm">{task.description}</p>
                                    </div>
                                 </div>
                              )
                        )}
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            <div className="flex h-full">
               <div className="m-auto text-center">
                  <p className="px-10 font-semibold text-mediumGrey">This board is empty. Create a new column to get started.</p>
                  <button className="rounded-full bg-purple py-2 px-3 mt-2 text-white text-xs" onClick={handleShowAddNewColumn}>
                     +Add New Colum
                  </button>
               </div>
            </div>
         )}
      </article>
   )
}

export default Board
