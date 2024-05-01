import Joi from 'joi'

const callbackController = {
  options: {
    validate: {
      params: Joi.object({
        plantId: Joi.string().required()
      })
    }
  },
  handler: (request, h) => {
    request.logger.info(
      request?.payload,
      `Callback endpoint called for plant: ${request.params.plantId}`
    )

    return request?.payload ?? {}
  }
}

export { callbackController }
