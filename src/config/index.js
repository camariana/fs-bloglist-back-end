import dotenv from 'dotenv'
dotenv.config()

const env = process.env.NODE_ENV

export const port = process.env.PORT
export const jwtSecret = process.env.JWT_SECRET
export const jwtExpires = process.env.JWT_EXPIRE

export const dbUrl = env === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI