import { buildErrorDetails } from '~/src/server/common/helpers/build-error-details'
import { sessionNames } from '~/src/server/common/constants/session-names'
import { detailsValidation } from '~/src/server/animals/helpers/schemas/details-validation'
import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'

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
