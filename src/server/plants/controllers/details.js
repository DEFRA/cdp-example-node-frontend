import { buildErrorDetails } from '~/src/server/common/helpers/build-error-details'
import { sessionNames } from '~/src/server/common/constants/session-names'
import { detailsValidation } from '~/src/server/plants/helpers/schemas/details-validation'
import { saveToPlant } from '~/src/server/plants/helpers/form/save-to-plant'

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

      return h.redirect('/plants/add/details')
    }

    if (!validationResult.error) {
      await saveToPlant(request, h, payload)

      return h.redirect('/plants/add/upload-pictures')
    }
  }
}

export { detailsController }
