import { Comment } from './comment.model'
import { Blog } from '../blog/blog.model'

export const createOne = (model) => async (request, response) => {
  const body = request.body
  const blogID = request.params.id

  if (body.content === undefined) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const blog = await Blog.findById(blogID)

  const comment = await model
    .create({ ...body })

  blog.comments = blog.comments.concat(comment._id)
  await blog.save()
  response.json(comment)
}


const crudControllers = model => ({
  createOne: createOne(model),
})


export default crudControllers(Comment)