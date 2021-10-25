import { Router } from 'express'
import { createOne, readAll } from './user.controller'

const router = Router()

// /api/blog
router
  .post('/', createOne)
  .get('/', readAll)



export default router