import { Router } from 'express'
import controller from './user.controller'

const router = Router()

// /user
router
  .route('/')
  .get(controller.readAll)
  .post(controller.createOne)

export default router