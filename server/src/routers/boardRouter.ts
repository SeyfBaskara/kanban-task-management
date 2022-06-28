import express from 'express'
import { createBoard, getBoard, deleteBoard, updateBoard } from '../controllers/board'
import { createColumn } from '../controllers/column'

const router = express.Router()

// Board routers
router.post('/create', createBoard)
router.get('/', getBoard)
router.delete('/:id', deleteBoard)
router.patch('/update/:id', updateBoard)

// Column routers
router.post('/create/column/:id', createColumn)

export default router
