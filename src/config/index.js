import dotenv from 'dotenv'
dotenv.config()

const env = process.env.NODE_ENV

export const port = process.env.PORT
export const jwtSecret = process.env.JWT_SECRET
export const jwtExpires = process.env.JWT_EXPIRE

export const dbUrl = env === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

// let dbUrl
// switch (env) {
// case 'development':
//   dbUrl = process.env.MONGODB_URI
//   break

// case 'test':
//   dbUrl = process.env.TEST_MONGODB_URI
//   break

// default:
//   dbUrl = process.env.LIVE_MONGODB_URI
// }

// export default  dbUrl