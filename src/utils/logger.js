const env = process.env.NODE_ENV

export const info = (...params) => {
  if(env !== 'test' || env !== 'testing') {
    console.log(...params)
  }
}

export const error = (...params) => {
  if(env !== 'test' || env !== 'testing') {
    console.error(...params)
  }
}