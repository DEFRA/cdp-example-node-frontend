import Joi from 'joi'

const birdValidation = Joi.object({
  birdId: Joi.number().integer().positive().required().messages({
    'any.only': 'Choose an entry',
    'any.required': 'Choose an entry'
  })
})

const spotterValidation = Joi.object({
  spotter: Joi.string().required().messages({
    'any.only': 'Enter a name',
    'any.required': 'Enter a a name'
  })
})

const trackingValidation = Joi.object({
  birdId: Joi.number().integer().positive().required(),
  trackingId: Joi.string().uuid().required()
})

export { birdValidation, spotterValidation, trackingValidation }
