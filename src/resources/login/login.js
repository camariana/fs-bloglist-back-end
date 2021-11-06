import { User } from '../user/user.model'
import { newToken } from '../../utils/auth'
import bcrypt from 'bcrypt'


export const login = async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.password)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const token = newToken(user)

  response
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name
    })
}