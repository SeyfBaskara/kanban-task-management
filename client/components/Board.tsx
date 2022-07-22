import React from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'

const Board = () => {
   const { boards, isSelected } = useAppSelector((state) => state.board)

   return (
      <article className="bg-lightGrey h-screen">
         {boards[isSelected].columns?.length !== 0 ? (
            <div className="flex h-full">
               <p className="m-auto text-center">Column grid will take a place </p>
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
