import React from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'

const Board = () => {
   const { boards, isSelected } = useAppSelector((state) => state.board)

   return (
      <article className="bg-lightGrey h-screen">
         {boards[isSelected]?.columns?.length !== 0 ? (
            <div className="flex h-full mt-16 overflow-x-auto gap-2">
               {boards[isSelected]?.columns?.map((column) => (
                  <div key={column.id} className="w-64">
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
                        <h1 className="uppercase text-sm font-semibold text-mediumGrey">{column.name} (2)</h1>
                     </div>
                     <div>
                        <p>this is one the task</p>
                        <p>another task to do</p>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            <div className="flex h-full">
               <div className="m-auto text-center">
                  <p className="px-10 font-semibold text-mediumGrey">This board is empty. Create a new column to get started.</p>
                  <button className="rounded-full bg-purple py-2 px-3 mt-2 text-white text-xs">+Add New Colum</button>
               </div>
            </div>
         )}
      </article>
   )
}

export default Board
