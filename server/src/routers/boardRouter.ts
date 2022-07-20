import express from 'express'
import { createBoard, getBoard, deleteBoard, updateBoard } from '../controllers/board'
import { createColumn, deleteColumn, updateColumn } from '../controllers/column'

const router = express.Router()

// Board routers
router.post('/create', createBoard)
router.get('/', getBoard)
router.delete('/delete/:id', deleteBoard)
router.patch('/update/:id', updateBoard)

// Column routers
router.post('/create/column', createColumn)
router.delete('/delete/column/:id', deleteColumn)
router.patch('/update/column/:id', updateColumn)

export default router
