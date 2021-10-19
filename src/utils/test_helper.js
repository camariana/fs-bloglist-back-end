import { Blog } from '../resources/blog/blog.model'

export const initialBlogs = [
  {
    'title': 'Which jobs help people the most?',
    'author': 'Benjamin Todd',
    'url': 'https://80000hours.org/career-guide/high-impact-jobs/#approach-1-earning-to-give',
    'likes': 100
  }
]

export const nonExistingId = async () => {
  const blog = new Blog({
    'title': 'What are we living for?',
    'author': 'A Camariana',
    'url': 'https://camariana.gm/blog/what-are-we-living-for',
    'likes': 0
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

export const blogsInDb = async () => {
  const blogs = await  Blog.find({})
  return blogs.map(blog => blog.toJSON())
}