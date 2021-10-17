import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    likes: Number,
  },
  { timestamps: true }
)

export const Blog = mongoose.model('blog', blogSchema)