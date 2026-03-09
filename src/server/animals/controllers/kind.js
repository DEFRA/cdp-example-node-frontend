import { buildErrorDetails } from '../../common/helpers/build-error-details.js'
import { sessionNames } from '../../common/constants/session-names.js'
import { saveToAnimal } from '../helpers/form/save-to-animal.js'
import { kindValidation } from '../helpers/schemas/kind-validation.js'

const kindController = {
  handler: async (request, h) => {
    const payload = request?.payload

    const validationResult = kindValidation.validate(payload, {
      abortEarly: false
    })

    if (validationResult?.error) {
      const errorDetails = buildErrorDetails(validationResult.error.details)

      request.yar.flash(sessionNames.validationFailure, {
        formValues: payload,
        formErrors: errorDetails
      })

      return h.redirect('/animals/add/kind')
    }

    if (!validationResult.error) {
      await saveToAnimal(request, h, payload)

      return h.redirect('/animals/add/upload-picture')
    }
  }
}

export { kindController }
