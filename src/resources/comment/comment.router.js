import { Router } from 'express'
import controller from './comment.controller'

const router = Router()

// /api/comment
router
  .route('/')
  //.get(controller.readAll)
  .post(controller.createOne)

// /api/comment/:id
// router
//   .route('/:id')
//   .get(controller.readOne)
//   .put(controller.updateOne)
//   .delete(controller.deleteOne)

export default router