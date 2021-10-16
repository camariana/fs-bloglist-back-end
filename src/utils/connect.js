import { dbUrl } from './config'
import mongoose from 'mongoose'

const connect = (url = dbUrl ) => {
  return mongoose.connect(
    url,
    {
      useNewUrlParser: true
    }
  )
}

export default connect