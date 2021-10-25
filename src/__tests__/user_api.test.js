import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import supertest from 'supertest'
import { User } from '../resources/user/user.model'
import { usersInDb } from '../utils/test_helper'

import app from '../server'
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'root', password: passwordHash })

  await user.save()
})

describe('Creating new User', () => {
  test('a new user can be added', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/user')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const contents = usersAtEnd.map(user => user.name)
    expect(contents).toContain(newUser.name)
  })

  test('a new user with existing username cannot be added', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      password: 'thesecrete',
    }

    const result = await api
      .post('/api/user')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})