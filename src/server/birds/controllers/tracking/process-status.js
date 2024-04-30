// import { config } from '~/src/config'
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
      console.log({ birdId, birds }, 'Bird not found')
      return h.redirect('/birds')
    }

    const tracking = await findTracking(bird, trackingId)

    if (!tracking) {
      console.log({ birdId, trackingId }, 'Tracking not found')
      return h.redirect(`/birds/${birdId}/tracking`)
    }

    if (!tracking.status || isStatusProcessing(tracking.status)) {
      console.log({ bird, tracking }, 'Tracking upload still processing')
      return h.redirect(`/birds/${birdId}/tracking/${trackingId}`)
    }

    if (tracking.status && isStatusReady(tracking.status)) {
      console.log({ bird, tracking }, 'Tracking upload ready')
      return h.redirect(`/birds/${birdId}/tracking/${trackingId}`)
    }

    if (tracking.status && isStatusRejected(tracking.status)) {
      console.log({ bird, tracking }, 'Tracking upload failed or rejected')
      return h.redirect(`/birds/${birdId}/tracking/${trackingId}`)
    }

    console.log(
      { bird, tracking },
      `Tracking upload status unexpected: ${tracking.status}`
    )
    return h.redirect(`/birds/`)
  }
}

export { processStatusController }
