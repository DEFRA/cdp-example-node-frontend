import { trackingValidation } from '../../helpers/schemas/bird-validation.js'
import { birds } from '../../data/birds.js'
import { findBirdById } from '../../helpers/find-bird.js'
import { findTracking } from '../../helpers/fetch/find-tracking.js'
import {
  isStatusProcessing,
  isStatusReady,
  isStatusRejected
} from '../../helpers/tracking-status.js'

const processStatusController = {
  options: {
    validate: {
      params: trackingValidation
    }
  },
  handler: async (request, h) => {
    const birdId = request.params.birdId
    const trackingId = request.params.trackingId

    const bird = findBirdById(birdId)

    if (!bird) {
      request.logger.warn({ birdId, birds }, 'Bird not found')
      return h.redirect('/birds')
    }

    const tracking = await findTracking(bird, trackingId)

    if (!tracking) {
      request.logger.warn({ birdId, trackingId }, 'Tracking not found')
      return h.redirect(`/birds/${birdId}/tracking`)
    }

    if (
      !tracking.trackingStatus ||
      isStatusProcessing(tracking.trackingStatus)
    ) {
      request.logger.debug(
        { bird, tracking },
        'Tracking upload still processing'
      )
      return h.redirect(`/birds/${birdId}/tracking/${trackingId}`)
    }

    if (tracking.trackingStatus && isStatusReady(tracking.trackingStatus)) {
      request.logger.info({ bird, tracking }, 'Tracking upload ready')
      return h.redirect(`/birds/${birdId}/tracking/${trackingId}`)
    }

    if (tracking.trackingStatus && isStatusRejected(tracking.trackingStatus)) {
      request.logger.warn(
        { bird, tracking },
        'Tracking upload failed or rejected'
      )
      return h.redirect(`/birds/${birdId}/tracking/${trackingId}`)
    }

    request.logger.error(
      { bird, tracking },
      `Tracking upload status unexpected: ${tracking.trackingStatus}`
    )
    return h.redirect(`/birds/`)
  }
}

export { processStatusController }
