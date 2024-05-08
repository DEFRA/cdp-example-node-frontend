import { trackingValidation } from '~/src/server/birds/helpers/schemas/bird-validation'
import { birds } from '~/src/server/birds/data/birds'
import { findBirdById } from '~/src/server/birds//helpers/find-bird'
import { findTracking } from '~/src/server/birds/helpers/fetch/find-tracking'
import {
  isStatusProcessing,
  isStatusReady,
  isStatusRejected
} from '~/src/server/birds/helpers/tracking-status'

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
