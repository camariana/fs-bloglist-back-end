import dotenv from 'dotenv'
dotenv.config()

const env = process.env.NODE_ENV
export const port = process.env.PORT
export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRE = process.env.JWT_EXPIRE

export let dbUrl = ''

switch(env) {
case 'test':
  dbUrl = process.env.TEST_MONGODB_URI
  break
case 'production':
  dbUrl = process.env.LIVE_MONGODB_URI
  break
default:
  dbUrl = process.env.LOCAL_MONGODB_URI
}