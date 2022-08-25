import React, { useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import {
   setIsHide,
   setIsLightbox,
   setIsDeleteBoard,
   setIsEditBoard,
   setIsEditTask,
   setIsAddTask,
   setIsDeleteTask,
} from 'app/features/boardSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'

const Header: React.FC = () => {
   const [isModalOptions, setIsModalOptions] = useState<boolean>(false)
   const { isHide, isLightbox, boards, isSelected } = useAppSelector((state) => state.board)
   const dispatch = useAppDispatch()
   const { systemTheme, theme, setTheme } = useTheme()
   const currentTheme = theme === 'system' ? systemTheme : theme

   const handleSidebar = () => {
      dispatch(setIsHide(!isHide))
      dispatch(setIsLightbox(!isLightbox))
   }

   const handleScreenModals = () => {
      setIsModalOptions(!isModalOptions)
   }

   const handleShowDeleteBoard = () => {
      dispatch(setIsDeleteBoard(true))
      dispatch(setIsLightbox(true))
      setIsModalOptions(false)
   }

   const handleShowEditBoard = () => {
      dispatch(setIsEditBoard(true))
      dispatch(setIsLightbox(true))
      setIsModalOptions(false)
   }

   const handleAddNewTask = () => {
      if (boards[isSelected]?.columns?.length !== 0) {
         dispatch(setIsAddTask(true))
         dispatch(setIsLightbox(true))
      }
   }

   const handleShowEditTask = () => {
      dispatch(setIsEditTask(true))
      dispatch(setIsLightbox(true))
      setIsModalOptions(false)
   }

   const handleShowDeleteTask = () => {
      dispatch(setIsDeleteTask(true))
      dispatch(setIsLightbox(true))
      setIsModalOptions(false)
   }

   return (
      <header className="w-screen flex items-center fixed bg-white dark:bg-darkGrey">
         <section className="hidden sm:flex w-48 shrink-0 p-3 md:w-60">
            {currentTheme === 'dark' ? (
               <div>
                  <Image src="/assets/logo-light.svg" alt="logo" width={143} height={23} />
               </div>
            ) : (
               <div>
                  <Image src="/assets/logo-dark.svg" alt="logo" width={143} height={23} />
               </div>
            )}
         </section>
         <section className="flex w-screen justify-between items-center p-3 border-l-2 border-lightGrey dark:border-linesDark ">
            <div className="flex gap-3 items-center">
               <div className="sm:hidden">
                  <Image src="/assets/logo-mobile.svg" alt="logo" width={24} height={25} />
               </div>
               <div className="flex gap-2">
                  <h3 className="font-bold">{isSelected !== undefined ? boards[isSelected]?.name : boards[0]?.name}</h3>
                  <div className="sm:hidden" onClick={handleSidebar}>
                     {isHide ? (
                        <Image src="/assets/icon-chevron-up.svg" alt="chevron icon" width={10} height={7} />
                     ) : (
                        <Image src="/assets/icon-chevron-down.svg" alt="chevron icon" width={10} height={7} />
                     )}
                  </div>
               </div>
            </div>
            <div className="flex gap-2 items-center sm:gap-4 md:mr-3">
               <div
                  className={`bg-purple w-12 rounded-full text-center p-1 ${
                     boards[isSelected]?.columns?.length === 0 && 'opacity-40'
                  } sm:hidden`}
                  onClick={handleAddNewTask}
               >
                  <Image src="/assets/icon-add-task-mobile.svg" alt="add icon" width={12} height={12} />
               </div>
               <div>
                  <button
                     className={`hidden rounded-full bg-purple py-2 px-3 text-white text-xs ${
                        boards[isSelected]?.columns?.length === 0 && 'opacity-40'
                     } sm:block`}
                     onClick={handleAddNewTask}
                  >
                     +Add New Task
                  </button>
               </div>
               <div className="relative w-1.5 h-5 cursor-pointer" onClick={handleScreenModals}>
                  <Image src="/assets/icon-vertical-ellipsis.svg" alt="ellipsis icon" layout="fill" />
               </div>
            </div>
         </section>
         {isModalOptions && (
            <section className="fixed right-2 top-16 flex flex-col w-52 gap-1 pl-2 bg-white dark:bg-darkGrey rounded">
               <button className="text-left p-1 w-3/4" onClick={handleShowEditBoard}>
                  Edit Board
               </button>
               <button className="text-left p-1 w-3/4" onClick={handleShowDeleteBoard}>
                  Delete Board
               </button>
               <button className="text-left p-1 w-3/4" onClick={handleShowEditTask}>
                  Edit Task
               </button>
               <button className="text-left p-1 w-3/4" onClick={handleShowDeleteTask}>
                  Delete Task
               </button>
            </section>
         )}
      </header>
   )
}

export default Header
