import express from 'express'
import {sendNotification} from '../controllers/Notification.js'

const router = express.Router();

router.get('/:id',sendNotification)

export default router