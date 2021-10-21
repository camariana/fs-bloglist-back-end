import mongoose from 'mongoose'
import supertest from 'supertest'
import { Blog } from '../../resources/blog/blog.model'
import { initialBlogs, nonExistingId, blogsInDb } from '../../utils/test_helper'

import app from '../../server'
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.create(initialBlogs)
})


describe('Blog is returned as json', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blog')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})


describe('Creating new Blog', () => {
  test('a new blog can be added', async () => {
    const blog = {
      'title': 'What are we living for?',
      'author': 'A Camariana',
      'url': 'https://camariana.gm/blog/what-are-we-living-for',
      'likes': 0
    }

    await api
      .post('/api/blog')
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain(
      'What are we living for?'
    )
  })

  test('a new blog without the required properties cannot be added', async () => {
    const blog = {
      'author': 'A Camariana',
      'likes': 0
    }

    await api
      .post('/api/blog')
      .send(blog)
      .expect(400)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })
})


describe('Reading Blog', () => {
  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blog')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('a specific blog is returned', async () => {
    const blogAtStart = await blogsInDb()

    const blogToReturn = blogAtStart[0]

    const resultBlog = await api
      .get(`/api/blog/${blogToReturn.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToReturn = JSON.parse(JSON.stringify(blogToReturn))
    expect(resultBlog.body).toEqual(processedBlogToReturn)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blog')

    const contents = response.body.map(content => content.title)

    expect(contents).toContain(
      'Which jobs help people the most?'
    )
  })

  test('a blog cannot be returned if it does not exist', async () => {
    const validNonexistingId = await nonExistingId()

    await api
      .get(`/api/blog/${validNonexistingId}`)
      .expect(404)
  })

  test('a blog cannot be returned if its ID is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blog/${invalidId}`)
      .expect(400)
  })
})


describe('Updating Blog', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await blogsInDb()

    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blog/${blogToUpdate.id}`)
      .expect(200)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).not.toEqual(blogToUpdate)
  })
})


describe('Deleting Blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blog/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})



afterAll(() => {
  mongoose.connection.close()
})
