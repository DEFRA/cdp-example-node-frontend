import { trackingValidation } from '~/src/server/birds/helpers/schemas/bird-validation'
import { birds } from '~/src/server/birds/data/birds'
import { findBirdById } from '~/src/server/birds/helpers/find-bird'
import { findTracking } from '~/src/server/birds/helpers/fetch/find-tracking'
import { findTrackingLocations } from '~/src/server/birds/helpers/fetch/find-tracking-locations'
import {
  isStatusProcessing,
  isStatusReady,
  isStatusRejected
} from '~/src/server/birds/helpers/tracking-status'

const showTrackingController = {
  options: {
    validate: {
      params: trackingValidation
    }
  },
  handler: async (request, h) => {
    const birdId = request.params.birdId
    const trackingId = request.params.trackingId

    const bird = await findBirdById(birdId)

    if (!bird) {
      request.logger.warn({ birdId, birds }, 'Bird not found')
      return h.redirect('/birds')
    }

    const { tracking } = await findTracking(bird, trackingId)

    if (!tracking) {
      request.logger.info({ birdId, trackingId }, 'Tracking not found')
      return h.redirect(`/birds/${birdId}/tracking`)
    }

    const spotter = tracking.spotter
    const fileDetails = tracking.fileDetails ?? {}
    request.logger.debug({ bird, tracking, fileDetails }, 'Find tracking')

    const breadcrumbs = [
      {
        text: 'Birds',
        href: '/birds'
      },
      {
        text: bird.name,
        href: `/birds/${birdId}`
      },
      {
        text: 'Tracking',
        href: `/birds/${birdId}/tracking/${trackingId}`
      }
    ]

    const context = {
      pageTitle: `Tracking ${bird.name}`,
      heading: `Tracking ${bird.name}`,
      bird,
      birdId,
      tracking,
      spotter,
      trackingId,
      breadcrumbs
    }

    if (tracking.trackingStatus && isStatusReady(tracking.trackingStatus)) {
      const trackingLocations = await findTrackingLocations(
        tracking,
        request.logger
      )
      const locations = trackingLocations.map((location) => [
        {
          text: location.date
        },
        {
          text: location.time
        },
        {
          text: location.latitude,
          format: 'numeric'
        },
        {
          text: location.longitude,
          format: 'numeric'
        },
        {
          text: `www.latlong.net/c/?lat=${location.latitude}&long=${location.longitude}`
        }
      ])
      return h.view('birds/views/tracking/show-tracking', {
        ...context,
        locations
      })
    }

    if (
      !tracking.trackingStatus ||
      isStatusProcessing(tracking.trackingStatus)
    ) {
      return h.view('birds/views/tracking/show-tracking-processing', {
        ...context
      })
    }

    if (tracking.trackingStatus && isStatusRejected(tracking.trackingStatus)) {
      return h.view('birds/views/tracking/show-tracking-rejected', {
        ...context
      })
    }

    request.logger.error({ birdId, trackingId }, 'Tracking status unknown')
    return h.redirect(`/birds/${birdId}/tracking`)
  }
}

export { showTrackingController }
