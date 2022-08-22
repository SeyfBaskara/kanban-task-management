import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { setIsEditBoard, setIsLightbox, updateBoard, deleteColumn, createColumn } from 'app/features/boardSlice'

interface ICloumnState {
   name: string
}

const EditBoard: React.FC = () => {
   const { isEditBoard, isSelected, boards } = useAppSelector((state) => state.board)
   const [name, setName] = useState<string>('')
   const [columnID, setColumnID] = useState<string | undefined>('')
   const [inputFields, setInputFields] = useState<ICloumnState[]>([{ name: '' }])
   const dispatch = useAppDispatch()
   const columnLength = boards[isSelected]?.columns?.length

   useEffect(() => {
      setName(boards[isSelected]?.name)
      const newInput = [{ name: '' }]
      boards[isSelected]?.columns?.map((col) => newInput.push({ name: col.name }))
      newInput.shift()
      setInputFields(newInput)
   }, [isSelected])

   const newAddedColumns = () => {
      const columnNames = boards[isSelected]?.columns?.map((col) => col.name)
      const newColumns: string[] = []

      for (let input of inputFields) {
         if (!columnNames?.includes(input.name) && input.name !== '') {
            newColumns.push(input.name)
         }
      }

      return newColumns
   }

   const handleEditBoard = () => {
      const newcolumn = newAddedColumns()
      const boardID = boards[isSelected].boardID

      if (name !== '' && boards[isSelected]?.name !== name) {
         dispatch(updateBoard({ name, id: boards[isSelected].id }))
         dispatch(setIsEditBoard(false))
         dispatch(setIsLightbox(false))
      }
      if (columnID !== '' && columnID !== undefined) {
         if (typeof columnID !== 'undefined') dispatch(deleteColumn({ id: columnID, boardID }))
         setColumnID('')
         dispatch(setIsEditBoard(false))
         dispatch(setIsLightbox(false))
      }

      if (columnLength !== inputFields.length && newcolumn.length !== 0) {
         newcolumn.forEach((name) => dispatch(createColumn({ name, boardID, id: '' })))
         dispatch(setIsEditBoard(false))
         dispatch(setIsLightbox(false))
      }
   }

   const handleCloseEditBoardModal = () => {
      dispatch(setIsEditBoard(false))
      dispatch(setIsLightbox(false))
      setColumnID('')
      if (columnLength !== inputFields.length) {
         let removeInput = 1
         if (columnLength !== undefined) {
            removeInput = inputFields.length - columnLength
         }
         setInputFields(inputFields.slice(0, -removeInput))
      }
   }

   const handleEditColumn = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const newfield = { name: '' }
      setInputFields([...inputFields, newfield])
   }

   const handleRemoveInputField = (index: number) => {
      let data = [...inputFields]
      const columnID = boards[isSelected].columns?.filter((col) => col.name === data[index].name)[0]?.id
      setColumnID(columnID)
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
            isEditBoard
               ? 'fixed flex flex-col gap-5 top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2 bg-white w-5/6 p-4 rounded sm:w-96 z-50'
               : 'hidden'
         }`}
      >
         <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl">Edit Board</h1>
            <div className="fixed right-2 top-1" onClick={handleCloseEditBoardModal}>
               <Image src="/assets/icon-cross.svg" alt="cross close icon" width={15} height={15} />
            </div>
            <form className="flex flex-col ">
               <label className="text-sm text-mediumGrey mb-1.5">Board Name</label>
               <input
                  className="border-2 p-1 text-sm rounded"
                  type="text"
                  placeholder="e.g Web design"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
               />
            </form>
         </div>
         <div>
            <form className="flex flex-col gap-2" onSubmit={handleEditColumn} autoComplete="off">
               <label className="text-sm text-mediumGrey">Board Cloumns</label>
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
            <button className="p-1.5 text-white bg-purple rounded-full w-full" onClick={handleEditBoard}>
               Save Changes
            </button>
         </div>
      </section>
   )
}

export default EditBoard
