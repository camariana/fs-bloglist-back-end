import { port } from './config'
import connect from './utils/connect'
import express, { json } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'express-async-errors'

import { unknownEndpoint, errorHandler, requestLogger } from './utils/middleware'
import { info, error as _error } from './utils/logger'

import blogRouter from './resources/blog/blog.router'
import userRouter from './resources/user/user.router'
import commentRouter from './resources/comment/comment.router'

const app = express()
connect() //TODO remove this after doing the tests

app.use(cors())
app.use(json())
app.use(morgan('dev'))

app.use(requestLogger)

app.use('/api/blog', blogRouter)
app.use('/api/comment', commentRouter)
app.use('/user', userRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export const start = async () => {
  try {
    await connect()
    app.listen(port, () => {
      info(`REST API on http://localhost:${port}/api`)
    })
  } catch (error) {
    _error('error connecting to database:', error.message)
  }
}

export default app