import express from 'express'
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task'
import { createSubtask, getSubtasks, updateSubtask, deleteSubtask } from '../controllers/subTask'
const router = express.Router()

// Tasks Routers
router.post('/create', createTask)
router.get('/', getTasks)
router.patch('/update/:id', updateTask)
router.delete('/delete/:id', deleteTask)

//Subtasks Routers
router.post('/subtask/create', createSubtask)
router.get('/subtasks', getSubtasks)
router.patch('/subtask/update/:id', updateSubtask)
router.delete('/subtask/delete/:id', deleteSubtask)

export default router
