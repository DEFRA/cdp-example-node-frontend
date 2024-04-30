import { trackingValidation } from '~/src/server/birds/helpers/schemas/bird-validation'
import { birds } from '~/src/server/birds/data/birds'
import { findBirdById } from '~/src/server/birds//helpers/find-bird'
import { findTrackingById } from '~/src/server/birds/helpers/find-tracking'

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
      console.log({ birdId, birds }, 'Bird not found')
      return h.redirect('/birds')
    }

    const tracking = findTrackingById(birdId, trackingId)

    if (!tracking) {
      console.log({ bird, trackingId }, 'Tracking not found')
      return h.redirect(`/birds/${birdId}/tracking`)
    }

    console.log({ bird, tracking }, 'Tracking upload finished')

    return h.redirect(`/birds/${birdId}/tracking/${trackingId}/process-status`)
  }
}

export { trackingUploadedController }
