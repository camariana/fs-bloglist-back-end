import { Router } from 'express'
import controller from './user.controller'

const router = Router()

// /api/user
router
  .route('/')
  .get(controller.readAll)
  .post(controller.createOne)

export default router