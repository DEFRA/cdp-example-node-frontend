import Joi from 'joi'

import { animalNames } from '~/src/server/animals/constants/animal-names'

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
