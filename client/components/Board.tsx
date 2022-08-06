import React from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'

const Board = () => {
   const { boards, isSelected } = useAppSelector((state) => state.board)

   return (
      <article className="bg-lightGrey h-screen">
         {boards[isSelected]?.columns?.length !== 0 ? (
            <div className="flex h-full mt-16 overflow-x-auto gap-2">
               {boards[isSelected]?.columns?.map((column) => (
                  <div key={column.id} className="w-64 p-2">
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
                           <h1 className="uppercase text-sm font-semibold text-mediumGrey">{column.name} (3)</h1>
                        </div>
                        {column.tasks?.map(
                           (task) =>
                              column.name === task.status && (
                                 <div className="mt-3">
                                    <div className="bg-white rounded p-2">
                                       <p className="font-bold">{task.title}</p>
                                       <p className="text-mediumGrey text-sm">{task.description}</p>
                                    </div>
                                 </div>
                              )
                        )}
                        {/* {column.name === 'done' && (
                           <div className="mt-3">
                              <div className="bg-white rounded p-2">
                                 <p className="font-bold">Build UI for onboarding flow</p>
                                 <p className="text-mediumGrey text-sm">0 of 3 subtask</p>
                              </div>
                           </div>
                        )} */}
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
