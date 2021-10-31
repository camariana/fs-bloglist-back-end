import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blog'
    }
  ]
},
{ timestamps: true }
)


/*
There are few issues with updated mongoose-unique-validator, a recommended version is 2.0.1. Tested various versions before concluding. //Error with other versions: "User validation failed: id: Error, expected `id` to be unique" //Link to the issue: https://github.com/blakehaswell/mongoose-unique-validator/issues/88#issuecomment-429189084
*/
// So due to that I comment this line below
//userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.password
  }
})

export const User = mongoose.model('user', userSchema)