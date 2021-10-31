import { Blog } from './blog.model'
import { User } from '../user/user.model'

export const createOne = (model) => async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)

  console.log(user);

  const blog = await model
    .create({ ...body, createdBy: user._id })

  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  response.json(blog)
}

export const readAll = (model) => async (request, response) => {
  const docs = await model
    .find({})
    .populate('createdBy', { username: 1, name: 1 })
  response.json(docs)
}

export const readOne = (model) => async (request, response) => {
  //const createdBy = request.user.id
  const id = request.params.id
  const doc = await model
    .findById(id)

  if(!doc) {
    return response.status(404).end()
  }

  response.json(doc)
}

export const updateOne = (model) => async (request, response) => {
  //const createdBy = request.user.id
  const id = request.params.id
  const body = request.body

  const updatedDoc = await model
    .findByIdAndUpdate(id, body, { new: true })

  if (!updatedDoc) {
    return response.status(400).end()
  }

  response.json(updatedDoc)
}

export const deleteOne = (model) => async (request, response) => {
  //const createdBy = request.user.id
  const id = request.params.id

  const removed = await model
    .findByIdAndRemove(id)

  if(!removed) {
    return response.status(400).end()
  }

  response.status(204).end()
}

const controllers = model => ({
  createOne: createOne(model),
  readAll: readAll(model),
  readOne: readOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
})


export default controllers(Blog)