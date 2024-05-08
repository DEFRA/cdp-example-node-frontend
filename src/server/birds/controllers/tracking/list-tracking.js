import { sessionNames } from '~/src/server/common/constants/session-names'
import { findBirdById } from '~/src/server/birds/helpers/find-bird'
import { birdValidation } from '~/src/server/birds/helpers/schemas/bird-validation'
import { findBirdTrackings } from '~/src/server/birds/helpers/fetch/find-bird-trackings'

const listTrackingController = {
  options: {
    validate: {
      params: birdValidation
    }
  },
  handler: async (request, h) => {
    request.yar.clear(sessionNames.validationFailure)
    const { birdId } = request.params
    const bird = findBirdById(birdId)

    if (!bird) {
      request.logger.warn({ birdId }, 'Bird not found')
      return h.redirect('/birds')
    }

    const { trackings } = await findBirdTrackings(bird)

    const trackingList = trackings.map((tracking) => {
      return {
        trackingId: tracking.trackingId,
        trackingStatus: tracking.trackingStatus,
        spotter: tracking.spotter,
        date: new Date(tracking.createdAt)
      }
    })

    request.logger.debug({ bird, trackings }, 'Find tracking list')

    return h.view('birds/views/tracking/list-tracking', {
      pageTitle: 'Bird tracking',
      heading: 'Bird tracking',
      bird,
      trackings: trackingList,
      breadcrumbs: [
        {
          text: 'Birds',
          href: '/birds'
        },
        {
          text: bird.name,
          href: `/birds/${birdId}`
        },
        {
          text: 'Tracking'
        }
      ]
    })
  }
}

export { listTrackingController }
