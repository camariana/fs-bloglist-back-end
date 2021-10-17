export const getAll = (model) => async (request, response) => {
  try {
    const docs = await model
      .find({})
    response.json(docs.map(d => d.toJSON()))
  } catch (error) {
    console.error(error)
  }
}

export const createOne = (model) => async (request, response) => {
  const body = request.body
  //const createdBy = request.user._id

  try {
    const doc = await model
      .create({ ...body })
    response.json(doc)
  } catch (error) {
    console.error(error)
  }
}

export const crudControllers = model => ({
  //getOne: getOne(model),
  getAll: getAll(model),
  createOne: createOne(model)
  // updateOne: updateOne(model),
  // removeOne: removeOne(model),
})