import { buildErrorDetails } from '../../common/helpers/build-error-details.js'
import { sessionNames } from '../../common/constants/session-names.js'
import { detailsValidation } from '../helpers/schemas/details-validation.js'
import { saveToAnimal } from '../helpers/form/save-to-animal.js'

const detailsController = {
  handler: async (request, h) => {
    const payload = request?.payload

    const validationResult = detailsValidation.validate(payload, {
      abortEarly: false
    })

    if (validationResult?.error) {
      const errorDetails = buildErrorDetails(validationResult.error.details)

      request.yar.flash(sessionNames.validationFailure, {
        formValues: payload,
        formErrors: errorDetails
      })

      return h.redirect('/animals/add/details')
    }

    if (!validationResult.error) {
      await saveToAnimal(request, h, payload)

      return h.redirect('/animals/add/kind')
    }
  }
}

export { detailsController }
