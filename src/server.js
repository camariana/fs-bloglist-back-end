import { port } from './config'
import connect from './utils/connect'
import express, { json } from 'express'
const app = express()
import cors from 'cors'
import morgan from 'morgan'

import { unknownEndpoint, errorHandler, requestLogger } from './utils/middleware'
import { info, error as _error } from './utils/logger'

app.use(cors())
app.use(json())
app.use(morgan('dev'))

app.use(requestLogger)

let notes = [  {    id: 1,    content: 'HTML is easy',    date: '2019-05-30T17:30:31.098Z',    important: true  },  {    id: 2,    content: 'Browser can execute only Javascript',    date: '2019-05-30T18:39:34.091Z',    important: false  },  {    id: 3,    content: 'GET and POST are the most important methods of HTTP protocol',    date: '2019-05-30T19:20:14.298Z',    important: true  }]

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

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