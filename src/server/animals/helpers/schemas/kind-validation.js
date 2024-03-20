import Joi from 'joi'

const kindValidation = Joi.object({
  kind: Joi.string()
    .required()
    .valid('rabbit', 'cow', 'horse', 'otter', 'yak')
    .messages({
      'any.only': 'Choose an entry',
      'any.required': 'Choose an entry'
    })
})

export { kindValidation }
