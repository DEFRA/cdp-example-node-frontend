import Joi from 'joi'

const detailsValidation = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Enter value'
  })
})

export { detailsValidation }
