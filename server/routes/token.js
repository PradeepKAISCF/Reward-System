import express from 'express'
import { postToken } from '../controllers/Token.js'

const router = express.Router()

router.post('/:id',postToken)

export default router
