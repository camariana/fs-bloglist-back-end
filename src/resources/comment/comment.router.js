import { Router } from 'express'
import controller from './comment.controller'

const router = Router()

// /api/blog/:id/comment
router
  .route('/:id/comment')
  .post(controller.createOne)

export default router