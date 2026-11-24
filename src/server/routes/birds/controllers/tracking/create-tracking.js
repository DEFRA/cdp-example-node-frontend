import { sessionNames } from '#/server/common/constants/session-names.js'
import { buildErrorDetails } from '#/server/common/helpers/build-error-details.js'
import { birdValidation } from '../../helpers/schemas/bird-validation.js'

const createTrackingController = {
  handler: async (request, h) => {
    const payload = request?.payload

    const validationResult = birdValidation.validate(payload, {
      abortEarly: false
    })

    if (validationResult?.error) {
      request.logger.warn('validationResult.error', validationResult.error)

      const errorDetails = buildErrorDetails(validationResult.error.details)

      request.yar.flash(sessionNames.validationFailure, {
        formValues: payload,
        formErrors: errorDetails
      })

      return h.redirect('/birds')
    }

    if (!validationResult.error) {
      request.logger.debug('Save tracking')
      const birdId = payload.birdId

      return h.redirect(`/birds/${birdId}/tracking/spotter`)
    }
  }
}

export { createTrackingController }
