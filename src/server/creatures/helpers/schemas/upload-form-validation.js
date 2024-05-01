import Joi from 'joi'

const uploadFormValidation = Joi.object({
  kind: Joi.string()
    .required()
    .valid(
      'Dragon',
      'Werewolf',
      'Vampire',
      'Mermaid',
      'Unicorn',
      'Fairy',
      'Leprechaun',
      'Gnome'
    )
    .messages({
      'any.message': 'Choose an entry',
      'any.required': 'Choose an entry'
    }),
  // todo use date validation
  day: Joi.number().required().min(1).max(31).messages({
    'any.only': 'Choose an entry',
    'any.required': "'Day' required",
    'number.base': "'Day' should be a number",
    'number.min': "'Day' should be 1 or above",
    'number.max': "'Day' cant be greater than 31"
  }),
  month: Joi.number().required().positive().max(12).message({
    'any.only': 'Choose an entry',
    'any.required': "'Month' required",
    'number.base': "'Month' must be a number",
    'number.min': "'Month' must be 1 or above",
    'number.max': "'Month' must not be greater than 12"
  }),
  year: Joi.number().required().greater(2000).less(2030).messages({
    'any.only': 'Choose an entry',
    'any.required': "'Year' required",
    'number.base': "'Year' must be a number",
    'number.min': "'Year' must be between 2000 and 2030",
    'number.max': "'Year' must be between 2000 and 2030"
  }),
  realSighting: Joi.string().required().valid('yes', 'no').messages({
    'any.only': "Select 'yes' or 'no'",
    'any.required': "Select 'yes' or 'no'"
  }),
  addressLine1: Joi.string().required().messages({
    'any.required': "'Address line 1' required"
  }),
  addressTown: Joi.string().required().messages({
    'any.required': "'Town or city' required"
  }),
  addressPostcode: Joi.string().required().messages({
    'any.required': "'Postcode' required"
  }),
  creatureFiles: Joi.any().required().messages({
    'any.only': 'Choose an entry',
    'any.required': 'Choose an entry'
  }),
  evidenceFiles: Joi.any()
})

export { uploadFormValidation }
