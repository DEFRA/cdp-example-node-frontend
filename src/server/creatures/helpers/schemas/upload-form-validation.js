import JoiBase from 'joi'
import JoiDateFactory from '@joi/date'

import { creatureNames } from '~/src/server/creatures/constants/creature-names'

const Joi = JoiBase.extend(JoiDateFactory)

const errorMessages = {
  required: 'Enter a value',
  choose: 'Choose an entry',
  date: 'Enter a valid date'
}

const uploadFormValidation = Joi.object({
  name: Joi.string().required().messages({
    'any.message': errorMessages.choose,
    'any.required': errorMessages.choose
  }),
  kind: Joi.string()
    .required()
    .valid(...creatureNames)
    .messages({
      'any.message': errorMessages.choose,
      'any.required': errorMessages.choose
    }),
  date: Joi.object({
    day: Joi.date().utc().format(['DD', 'D']), // Non-Zero and Zero based days accepted
    month: Joi.date().utc().format(['MM', 'M']), // Non-Zero and Zero based months accepted
    year: Joi.date().utc().format('YYYY')
  }).messages({
    'date.format': errorMessages.date
  }),
  realLifeSighting: Joi.string().valid('yes', 'no').required().messages({
    'any.only': errorMessages.choose,
    'any.required': errorMessages.choose
  }),
  addressLine1: Joi.when('realLifeSighting', {
    is: 'yes',
    then: Joi.string().required()
  }).messages({
    'any.required': errorMessages.required
  }),
  addressLine2: Joi.string().optional(),
  addressTown: Joi.when('realLifeSighting', {
    is: 'yes',
    then: Joi.string().required()
  }).messages({
    'any.required': errorMessages.required
  }),
  addressPostcode: Joi.when('realLifeSighting', {
    is: 'yes',
    then: Joi.string().required()
  }).messages({
    'any.required': errorMessages.required
  }),
  creatureFiles: Joi.any(), // These are checked elsewhere
  evidenceFiles: Joi.any() // These are checked elsewhere
})

export { uploadFormValidation }
