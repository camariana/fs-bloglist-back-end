import bcrypt from 'bcrypt'
import { User } from './user.model'

export const createOne = async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    password: passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
}

export const readAll = async (request, response) => {
  const users = await User.find({})
  response.json(users)
}