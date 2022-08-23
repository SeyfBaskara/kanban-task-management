import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { setIsAddBoard, setIsLightbox, createBoard, setIsSelected, createColumn } from 'app/features/boardSlice'

interface ICloumnState {
   name: string
}

const AddBoard: React.FC = () => {
   const [name, setName] = useState<string>('')
   const [inputFields, setInputFields] = useState<ICloumnState[]>([{ name: '' }])
   const { isAddBoard, boards } = useAppSelector((state) => state.board)
   const dispatch = useAppDispatch()

   useEffect(() => {
      setInputFields([])
   }, [isAddBoard])

   const handleCreateColumn = (boardID: string) => {
      inputFields.forEach((input) => dispatch(createColumn({ name: input.name, boardID, id: '' })))
   }

   const handleCreateNewBoard = () => {
      const boardID = uuidv4()
      if (name !== '') {
         dispatch(setIsAddBoard(false))
         dispatch(setIsLightbox(false))
         dispatch(createBoard({ name, id: '', boardID }))
         setName('')
         dispatch(setIsSelected(boards.length))
         if (inputFields.length !== 0) {
            handleCreateColumn(boardID)
         }
      }
   }

   const handleCloseAddBoardModal = () => {
      dispatch(setIsAddBoard(false))
      dispatch(setIsLightbox(false))
      setName('')
   }

   const handleAddNewColumn = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const newfield = { name: '' }
      setInputFields([...inputFields, newfield])
   }

   const handleRemoveInputField = (index: number) => {
      let data = [...inputFields]
      data.splice(index, 1)
      setInputFields(data)
   }

   const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      let data: any = [...inputFields]
      data[index][event.target.name] = event.target.value
      setInputFields(data)
   }

   return (
      <section
         className={`${
            isAddBoard
               ? 'fixed flex flex-col gap-5 top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-darkGrey w-5/6 p-4 rounded sm:w-96 z-50'
               : 'hidden'
         }`}
      >
         <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl">Add New Board</h1>
            <div className="fixed right-2 top-1" onClick={handleCloseAddBoardModal}>
               <Image src="/assets/icon-cross.svg" alt="cross close icon" width={15} height={15} />
            </div>
            <form className="flex flex-col ">
               <label className="text-sm text-mediumGrey dark:text-white mb-1.5">Board Name</label>
               <input
                  className="border-2 p-1 text-sm rounded dark:border-linesDark dark:bg-darkGrey"
                  type="text"
                  placeholder="e.g Web design"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
               />
            </form>
         </div>
         <div>
            <form className="flex flex-col gap-2" onSubmit={handleAddNewColumn} autoComplete="off">
               <label className="text-sm text-mediumGrey dark:text-white">Board Columns</label>
               {inputFields.map((input, index) => {
                  return (
                     <div className="flex gap-3 items-center " key={index}>
                        <input
                           type="text"
                           className="border-2 w-full p-1 rounded dark:border-linesDark dark:bg-darkGrey"
                           value={input.name}
                           autoComplete="off"
                           name="name"
                           required
                           onChange={(e) => handleInputChange(index, e)}
                        />
                        <div className="relative w-4 h-4" onClick={() => handleRemoveInputField(index)}>
                           <Image src="/assets/icon-cross.svg" alt="cross delete icon" layout="fill" />
                        </div>
                     </div>
                  )
               })}
               <button type="submit" className="p-1.5 text-purple bg-linesLight dark:bg-white rounded-full mt-1">
                  +Add New Column
               </button>
            </form>
         </div>
         <div>
            <button className="p-1.5 text-white bg-purple rounded-full w-full" onClick={handleCreateNewBoard}>
               Create New Board
            </button>
         </div>
      </section>
   )
}

export default AddBoard
