import { sessionNames } from '~/src/server/common/constants/session-names'
import { buildErrorDetails } from '~/src/server/common/helpers/build-error-details'
import {
  birdValidation,
  spotterValidation
} from '~/src/server/birds/helpers/schemas/bird-validation'
import { birds } from '~/src/server/birds/data/birds'
import { findBirdById } from '~/src/server/birds//helpers/find-bird'
import { createTracking } from '~/src/server/birds/helpers/create-tracking'

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
      console.log({ birdId, birds }, 'Bird not found')
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

      console.log('validationResult.error', validationResult.error)
      return h.redirect(`/birds/${birdId}/tracking/spotter`)
    }

    if (!validationResult.error) {
      console.log('Save tracking')

      const { trackingId } = await createTracking(bird, spotter)

      return h.redirect(`/birds/${birdId}/tracking/${trackingId}/upload`)
    }
  }
}

export { createBirdTrackingController }
