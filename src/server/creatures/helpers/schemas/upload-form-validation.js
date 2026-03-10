import Joi from 'joi'

import { creatureNames } from '../../constants/creature-names.js'
import { fileValidator } from './file-validator.js'

const errorMessages = {
  required: 'Enter a value',
  choose: 'Choose an entry'
}

const uploadFormValidation = function (csrfToken) {
  return Joi.object({
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
    addressLine2: Joi.string().default('').optional(),
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
    creatureFiles: fileValidator
      .alternatives(
        Joi.array().items(fileValidator.file().showFileName()),
        fileValidator.file()
      )
      .required()
      .messages({
        'any.required': 'You must upload at least one file'
      }),
    evidenceFiles: fileValidator
      .alternatives(
        Joi.array().items(fileValidator.file().showFileName()),
        fileValidator.file()
      )
      .required()
      .messages({
        'any.required': 'You must upload at least one file'
      }),
    csrfToken: Joi.string().valid(csrfToken).required().messages({
      'any.only': 'CSRF token did not match'
    })
  })
}

export { uploadFormValidation }
