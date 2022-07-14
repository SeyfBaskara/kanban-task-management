import React from 'react'

const Board = () => {
   return (
      <article className="bg-lightGrey">
         <div className="flex h-screen">
            <div className="m-auto text-center">
               <p className="px-10 font-semibold text-mediumGrey">This board is empty. Create a new column to get started.</p>
               <button className="rounded-full bg-purple py-2 px-3 mt-2 text-white text-xs">+Add New Colum</button>
            </div>
         </div>
      </article>
   )
}

export default Board
