import { sessionNames } from '../../../common/constants/session-names.js'
import { buildErrorDetails } from '../../../common/helpers/build-error-details.js'
import {
  birdValidation,
  spotterValidation
} from '../../helpers/schemas/bird-validation.js'
import { birds } from '../../data/birds.js'
import { findBirdById } from '../../helpers/find-bird.js'
import { createTracking } from '../../helpers/fetch/create-tracking.js'

const createBirdTrackingController = {
  options: {
    validate: {
      params: birdValidation,
      payload: spotterValidation
    }
  },
  handler: async (request, h) => {
    const payload = request?.payload
    const spotter = payload?.spotter
    const birdId = request.params.birdId
    const bird = findBirdById(birdId)

    if (!bird) {
      request.logger.warn({ birdId, birds }, 'Bird not found')
      return h.redirect('/birds')
    }

    const validationResult = spotterValidation.validate(payload, {
      abortEarly: false
    })

    if (validationResult?.error) {
      const errorDetails = buildErrorDetails(validationResult.error.details)

      request.yar.flash(sessionNames.validationFailure, {
        formValues: payload,
        formErrors: errorDetails
      })

      request.logger.warn('validationResult.error', validationResult.error)
      return h.redirect(`/birds/${birdId}/tracking/spotter`)
    }

    if (!validationResult.error) {
      request.logger.debug({ bird, spotter }, 'Save tracking')

      const { tracking } = await createTracking(bird, spotter)
      request.logger.debug({ tracking }, 'Save tracking response')

      if (!tracking) {
        request.logger.warn('No tracking')
        return h.redirect(`/birds/${birdId}/tracking/spotter`)
      }

      const trackingId = tracking?.trackingId
      return h.redirect(`/birds/${birdId}/tracking/${trackingId}/upload`)
    }
  }
}

export { createBirdTrackingController }
