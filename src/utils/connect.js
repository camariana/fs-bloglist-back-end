import { dbUrl } from '../config'
import mongoose from 'mongoose'

console.log(dbUrl) //TODO remove this

const connect = () => {
  return mongoose.connect(
    dbUrl,
    {
      useNewUrlParser: true
    }
  )
}

export default connect