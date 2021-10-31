import { Comment } from './comment.model'
import { Blog } from '../blog/blog.model'

export const createOne = (model) => async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(body.blog)

  console.log(blog);

  const comment = await model
    .create({ ...body, blog: blog._id })

  blog.comments = blog.comments.concat(comment._id)
  await blog.save()
  response.json(comment)
}


const crudControllers = model => ({
  createOne: createOne(model),
  // readAll: readAll(model),
  // readOne: readOne(model),
  // updateOne: updateOne(model),
  // deleteOne: deleteOne(model),
})


export default crudControllers(Comment)