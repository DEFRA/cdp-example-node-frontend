import Joi from 'joi'

const birdValidation = Joi.object({
  birdId: Joi.number().integer().positive().required().messages({
    'any.only': 'Choose an entry',
    'any.required': 'Choose an entry'
  })
})

const spotterValidation = Joi.object({
  spotter: Joi.string().required().messages({
    'any.only': 'Choose an entry',
    'any.required': 'Choose an entry'
  })
})

const trackingValidation = Joi.object({
  birdId: Joi.number().integer().positive().required(),
  trackingId: Joi.string().uuid().required()
})

export { birdValidation, spotterValidation, trackingValidation }
