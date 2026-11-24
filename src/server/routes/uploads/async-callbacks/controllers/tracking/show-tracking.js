import { trackingValidation } from '../../helpers/schemas/bird-validation.js'
import { birds } from '../../data/birds.js'
import { findBirdById } from '../../helpers/find-bird.js'
import { findTracking } from '../../helpers/fetch/find-tracking.js'
import { findTrackingLocations } from '../../helpers/fetch/find-tracking-locations.js'
import {
  isStatusProcessing,
  isStatusReady,
  isStatusRejected
} from '../../helpers/tracking-status.js'

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
      return h.redirect('/uploads/async-callbacks')
    }

    const { tracking } = await findTracking(bird, trackingId)

    if (!tracking) {
      request.logger.info({ birdId, trackingId }, 'Tracking not found')
      return h.redirect(`/uploads/async-callbacks/${birdId}/tracking`)
    }

    const spotter = tracking.spotter
    const fileDetails = tracking.fileDetails ?? {}
    request.logger.debug({ bird, tracking, fileDetails }, 'Find tracking')

    const breadcrumbs = [
      {
        text: 'File uploads',
        href: '/uploads'
      },
      {
        text: 'Async callbacks',
        href: '/uploads/async-callbacks'
      },
      {
        text: bird.name,
        href: `/uploads/async-callbacks/${birdId}`
      },
      {
        text: 'Tracking',
        href: `/uploads/async-callbacks/${birdId}/tracking/${trackingId}`
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
          text: location.date,
          format: 'numeric'
        },
        {
          text: location.time,
          format: 'numeric'
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
          html: `<a href="https://www.latlong.net/c/?lat=${location.latitude}&long=${location.longitude}">view</a>`
        }
      ])
      return h.view('uploads/async-callbacks/views/tracking/show-tracking', {
        ...context,
        locations
      })
    }

    if (
      !tracking.trackingStatus ||
      isStatusProcessing(tracking.trackingStatus)
    ) {
      return h.view(
        'uploads/async-callbacks/views/tracking/show-tracking-processing',
        {
          ...context
        }
      )
    }

    if (tracking.trackingStatus && isStatusRejected(tracking.trackingStatus)) {
      return h.view(
        'uploads/async-callbacks/views/tracking/show-tracking-rejected',
        {
          ...context,
          action: `/uploads/async-callbacks/${birdId}/tracking/spotter`
        }
      )
    }

    request.logger.error({ birdId, trackingId }, 'Tracking status unknown')
    return h.redirect(`/uploads/async-callbacks/${birdId}/tracking`)
  }
}

export { showTrackingController }
