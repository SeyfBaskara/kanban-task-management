import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { setIsLightbox, setIsAddColumn } from 'app/features/boardSlice'

interface ICloumnState {
   name: string
}

const AddColumn: React.FC = () => {
   const [inputFields, setInputFields] = useState<ICloumnState[]>([{ name: '' }])
   const { isAddColumn } = useAppSelector((state) => state.board)
   const dispatch = useAppDispatch()

   const handleCreateNewColumn = () => {
      console.log('create column')
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
               ? 'fixed flex flex-col gap-5 top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2 bg-white w-5/6 p-4 rounded sm:w-96 z-50'
               : 'hidden'
         }`}
      >
         <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl">Add New Column</h1>
            <div className="fixed right-2 top-1" onClick={handleCloseAddColumnModal}>
               <Image src="/assets/icon-cross.svg" alt="cross close icon" width={15} height={15} />
            </div>
         </div>
         <div>
            <form className="flex flex-col gap-2" onSubmit={handleAddNewColumn} autoComplete="off">
               <label className="text-sm text-mediumGrey">Board Column</label>
               {inputFields.map((input, index) => {
                  return (
                     <div className="flex gap-3 items-center " key={index}>
                        <input
                           type="text"
                           className="border-2 w-full p-1 rounded"
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
               <button type="submit" className="p-1.5 text-purple bg-linesLight rounded-full mt-1">
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
