import bcrypt from 'bcrypt'
import { User } from './user.model'

export const createOne = (model) => async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new model({
    username: body.username,
    name: body.name,
    password: passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
}

export const readAll = (model) => async (request, response) => {
  const users = await model
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
}

const controllers = model => ({
  createOne: createOne(model),
  readAll: readAll(model),
})


export default controllers(User)