import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  }
},
{ timestamps: true }
)

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Comment = mongoose.model('comment', commentSchema)