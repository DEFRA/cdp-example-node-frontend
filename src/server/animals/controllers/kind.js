import { buildErrorDetails } from '~/src/server/common/helpers/build-error-details'
import { sessionNames } from '~/src/server/common/constants/session-names'
import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'
import { kindValidation } from '~/src/server/animals/helpers/schemas/kind-validation'

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
