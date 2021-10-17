import { Router } from 'express'
import controller from './blog.controller'

const router = Router()

// /api/blog
router
  .route('/')
  .get(controller.getAll)
  .post(controller.createOne)

// /api/blog/:id
// router
//   .route('/:id')
//   .get(controller.getOne)
//   .put(controller.updateOne)
//   .delete(controller.removeOne)

export default router