import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { setIsLightbox, setIsAddColumn, createColumn } from 'app/features/boardSlice'

interface ICloumnState {
   name: string
}

const AddColumn: React.FC = () => {
   const [inputFields, setInputFields] = useState<ICloumnState[]>([{ name: '' }])
   const { isAddColumn, boards, isSelected } = useAppSelector((state) => state.board)
   const dispatch = useAppDispatch()
   const boardID = boards[isSelected]?.boardID

   useEffect(() => {
      setInputFields([{ name: '' }])
   }, [isAddColumn])

   const handleCreateNewColumn = () => {
      if (inputFields.length !== 0 && inputFields[0].name !== '') {
         inputFields.map((input) => {
            if (input.name !== '') {
               dispatch(createColumn({ name: input.name, boardID, id: '' }))
            }
         })

         dispatch(setIsAddColumn(false))
         dispatch(setIsLightbox(false))
      }
   }

   const handleCloseAddColumnModal = () => {
      dispatch(setIsAddColumn(false))
      dispatch(setIsLightbox(false))
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
            isAddColumn
               ? 'fixed flex flex-col gap-5 top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-darkGrey w-5/6 p-4 rounded sm:w-96 z-50'
               : 'hidden'
         }`}
      >
         <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl">Add New Column</h1>
            <div className="fixed right-2 top-1 cursor-pointer" onClick={handleCloseAddColumnModal}>
               <Image src="/assets/icon-cross.svg" alt="cross close icon" width={15} height={15} />
            </div>
         </div>
         <div>
            <form className="flex flex-col gap-2" onSubmit={handleAddNewColumn} autoComplete="off">
               <label className="text-sm text-mediumGrey dark:text-white">Board Column</label>
               {inputFields.map((input, index) => {
                  return (
                     <div className="flex gap-3 items-center " key={index}>
                        <input
                           type="text"
                           className="border-2 w-full p-2 rounded dark:border-linesDark dark:bg-darkGrey"
                           value={input.name}
                           autoComplete="off"
                           name="name"
                           required
                           onChange={(e) => handleInputChange(index, e)}
                        />
                        <div className="relative w-4 h-4 cursor-pointer" onClick={() => handleRemoveInputField(index)}>
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
            <button className="p-1.5 text-white bg-purple rounded-full w-full" onClick={handleCreateNewColumn}>
               Create New Column
            </button>
         </div>
      </section>
   )
}

export default AddColumn
