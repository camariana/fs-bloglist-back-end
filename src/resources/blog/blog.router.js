import { Router } from 'express'
import controller from './blog.controller'

const router = Router()

// /api/blog
router
  .route('/')
  .get(controller.readAll)
  .post(controller.createOne)

// /api/blog/:id
router
  .route('/:id')
  .get(controller.readOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne)

export default router