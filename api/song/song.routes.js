import express from 'express'
import { getSong, getSongs } from './song.controller.js'

const router = express.Router()

router.get('/', getSongs)
router.get('/:id', getSong)


export const songRoutes = router