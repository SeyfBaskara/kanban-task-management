import express from 'express'
import { createBoard } from '../controllers/board'

const router = express.Router()

router.post('/create', createBoard)

export default router
