import Joi from 'joi'

const yourDetailsValidation = Joi.object({
  phoneNumber: Joi.string().required().messages({
    'string.empty': 'Enter value'
  })
})

export { yourDetailsValidation }
