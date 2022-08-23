import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { setIsAddTask, setIsLightbox, createTask } from 'app/features/boardSlice'

interface ISubtaskState {
   name: string
}

interface ITaskInputs {
   title: string
   description: string
   status: string
}

const AddTask: React.FC = () => {
   const [taskInput, setTaskInput] = useState<ITaskInputs>({ title: '', description: '', status: '' })
   const [inputFields, setInputFields] = useState<ISubtaskState[]>([{ name: '' }])
   const { isAddTask, isSelected, boards } = useAppSelector((state) => state.board)
   const dispatch = useAppDispatch()

   useEffect(() => {
      setInputFields([])
   }, [isAddTask])

   const handleCreateNewTask = () => {
      // Create Task
      if (taskInput.title !== '' && taskInput.description !== '' && taskInput.status !== '') {
         dispatch(
            createTask({
               title: taskInput.title,
               description: taskInput.description,
               status: taskInput.status,
               boardID: boards[isSelected].boardID,
            })
         )
         dispatch(setIsAddTask(false))
         dispatch(setIsLightbox(false))
         setTaskInput({ title: '', description: '', status: '' })
      }
   }
   const handleTaskOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setTaskInput({ ...taskInput, [name]: value })
   }

   const handleCloseAddTaskModal = () => {
      dispatch(setIsAddTask(false))
      dispatch(setIsLightbox(false))
      setTaskInput({ title: '', description: '', status: '' })
   }

   const handleAddNewSubtask = (e: React.FormEvent<HTMLFormElement>) => {
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
            isAddTask
               ? 'fixed flex flex-col gap-5 top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-darkGrey w-5/6 p-4 rounded sm:w-96 z-50'
               : 'hidden'
         }`}
      >
         <div className="flex flex-col gap-3">
            <h1 className="font-bold text-xl">Add New Task</h1>
            <div className="fixed right-2 top-1" onClick={handleCloseAddTaskModal}>
               <Image src="/assets/icon-cross.svg" alt="cross close icon" width={15} height={15} />
            </div>
            <form className="flex flex-col ">
               <label className="text-sm text-mediumGrey dark:text-white mb-1.5">Title</label>
               <input
                  className="border-2 dark:border-linesDark  dark:bg-darkGrey p-1 text-sm rounded"
                  type="text"
                  name="title"
                  placeholder="e.g Take coffe break"
                  value={taskInput.title}
                  onChange={handleTaskOnChange}
                  required
               />
               <label className="text-sm text-mediumGrey dark:text-white mb-1.5 mt-6">Description</label>
               <textarea
                  className="border-2 p-1 text-sm rounded h-36 dark:border-linesDark dark:bg-darkGrey"
                  placeholder="e.g. It’s always good to take a break. This 
                  15 minute break will  recharge the batteries 
                  a little."
                  name="description"
                  value={taskInput.description}
                  onChange={handleTaskOnChange}
                  required
               />
            </form>
         </div>
         <div>
            <form className="flex flex-col gap-2" onSubmit={handleAddNewSubtask} autoComplete="off">
               <label className="text-sm text-mediumGrey dark:text-white">Subtasks</label>
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
                  +Add New Subtask
               </button>
            </form>
         </div>
         <div>
            <form className="flex flex-col gap-1 ">
               <label className="text-sm text-mediumGrey dark:text-white mb-1.5">Status</label>
               <input
                  className="border-2 p-1 text-sm rounded dark:border-linesDark dark:bg-darkGrey"
                  type="text"
                  name="status"
                  placeholder="Todo"
                  value={taskInput.status}
                  onChange={handleTaskOnChange}
                  required
               />
            </form>
         </div>
         <div>
            <button className="p-1.5 text-white bg-purple rounded-full w-full" onClick={handleCreateNewTask}>
               Create Task
            </button>
         </div>
      </section>
   )
}

export default AddTask
