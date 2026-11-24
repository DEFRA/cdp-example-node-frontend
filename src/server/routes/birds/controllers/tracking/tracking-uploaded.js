import { trackingValidation } from '../../helpers/schemas/bird-validation.js'
import { birds } from '../../data/birds.js'
import { findBirdById } from '../../helpers/find-bird.js'
import { findTracking } from '../../helpers/fetch/find-tracking.js'

const trackingUploadedController = {
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

    const { tracking } = await findTracking(bird, trackingId)

    if (!tracking) {
      request.logger.info({ bird, trackingId }, 'Tracking not found')
      return h.redirect(`/birds/${birdId}/tracking`)
    }

    request.logger.info({ bird, tracking }, 'Tracking upload finished')

    return h.redirect(`/birds/${birdId}/tracking/${trackingId}/process-status`)
  }
}

export { trackingUploadedController }
