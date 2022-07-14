import React, { useState } from 'react'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { setIsAddBoard, setIsHide } from 'app/features/boardSlice'

const SideBar: React.FC = () => {
   const { isHide } = useAppSelector((state) => state.board)
   const [isSidebar, setIsSidebar] = useState<boolean>(false)
   const dispatch = useAppDispatch()

   const handleHideSidebar = () => {
      setIsSidebar(true)
   }

   const handleShowSideBar = () => {
      setIsSidebar(false)
   }

   const handleCreateBoard = () => {
      dispatch(setIsHide(false))
      dispatch(setIsAddBoard(true))
   }

   return (
      <aside className="pt-14">
         {!isSidebar ? (
            <section
               className={`${
                  isHide
                     ? 'flex gap-5 absolute left-1/2 transform -translate-x-1/2 translate-y-5 h-auto w-56 pb-4 bg-white rounded '
                     : 'hidden'
               } sm:flex flex-col justify-between h-full w-48 shrink-0 md:w-60 z-50`}
            >
               <section>
                  <p className="pl-3 my-4 text-xs uppercase font-medium tracking-widest text-mediumGrey">All Boards(1)</p>
                  <div className="mr-3 mb-2">
                     <div className="flex p-2 pl-3 gap-3 items-center bg-purple rounded-r-full">
                        <div className="relative w-4 h-4">
                           <Image src="/assets/icon-board.svg" alt="board icon" layout="fill" />
                        </div>
                        <p className="text-white">Platform Launch</p>
                     </div>
                  </div>
                  <button className="flex items-center gap-3 pl-3 text-sm text-purple" onClick={handleCreateBoard}>
                     <div className="relative w-4 h-4">
                        <Image src="/assets/icon-board.svg" alt="board icon" layout="fill" />
                     </div>
                     +Create New Board
                  </button>
               </section>
               <section>
                  <div className="flex items-center justify-center gap-4 rounded bg-lightGrey p-3 mx-3">
                     <div className="relative w-5 h-5">
                        <Image src="/assets/icon-light-theme.svg" alt="light icon" layout="fill" />
                     </div>
                     <div className="w-10 h-5 r p-1 rounded-full bg-purple">
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                     </div>
                     <div className="relative w-4 h-4">
                        <Image src="/assets/icon-dark-theme.svg" alt="dark theme icon" layout="fill" />
                     </div>
                  </div>
                  <div
                     className={`${isHide ? 'hidden' : 'flex items-center gap-3 pl-4 mt-5 mb-10 cursor-pointer'}`}
                     onClick={handleHideSidebar}
                  >
                     <div className="relative w-5 h-4">
                        <Image src="/assets/icon-hide-sidebar.svg" alt="hide sidebar icon" layout="fill" />
                     </div>
                     <p className="text-mediumGrey text-sm">Hide Sidebar</p>
                  </div>
               </section>
            </section>
         ) : (
            <div
               className="hidden sm:block fixed bg-purple py-3 px-5 rounded-r-full bottom-10 cursor-pointer "
               onClick={handleShowSideBar}
            >
               <div>
                  <Image src="/assets/icon-show-sidebar.svg" alt="hide sidebar icon" width={16} height={11} />
               </div>
            </div>
         )}
      </aside>
   )
}

export default SideBar
