import express from 'express'
import { createBoard, getBoard } from '../controllers/board'

const router = express.Router()

router.post('/create', createBoard)
router.get('/', getBoard)

export default router
