import express from 'express'
import { createTask, getTask, updateTask, deleteTask } from '../controllers/task'

const router = express.Router()

router.post('/create', createTask)
router.get('/', getTask)
router.patch('/update/:id', updateTask)
router.delete('/delete/:id', deleteTask)

export default router
