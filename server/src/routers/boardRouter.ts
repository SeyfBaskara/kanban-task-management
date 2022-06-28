import express from 'express'
import { createBoard, getBoard, deleteBoard } from '../controllers/board'
import { createColumn } from '../controllers/column'

const router = express.Router()

router.post('/create', createBoard)
router.get('/', getBoard)
router.delete('/:id', deleteBoard)

// Column endpoints
router.post('/create/column/:id', createColumn)

export default router
