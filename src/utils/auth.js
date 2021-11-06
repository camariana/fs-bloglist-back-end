import { jwtSecret, jwtExpires } from '../config'
import jwt from 'jsonwebtoken'


export const newToken = (user) => {
  return jwt.sign(
    { username: user.username, id: user._id },
    jwtSecret,
    { expiresIn: jwtExpires }
  )
}

export const tokenExtractor = (request, response, next) => {
  const authorization = request.headers.authorization
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }

  next()
}

export const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, jwtSecret)
  if(!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else {
    request.user = decodedToken
  }
  next()
}