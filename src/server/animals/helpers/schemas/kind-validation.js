import Joi from 'joi'

import { animalNames } from '../../constants/animal-names.js'

const kindValidation = Joi.object({
  kind: Joi.string()
    .required()
    .valid(...animalNames)
    .messages({
      'any.only': 'Choose an entry',
      'any.required': 'Choose an entry'
    })
})

export { kindValidation }
