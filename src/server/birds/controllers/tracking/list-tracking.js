import { sessionNames } from '~/src/server/common/constants/session-names'
import { findBirdById } from '~/src/server/birds/helpers/find-bird'
import { birdValidation } from '/src/server/birds/helpers/schemas/bird-validation'
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
      console.log({ birdId }, 'Bird not found')
      return h.redirect('/birds')
    }

    const trackings = await findBirdTrackings(bird)
    //[
    //    { date: '2023-02-15 15:16', spotter: 'Peter', trackingId: 4 },
    //    { date: '2024-02-20 11:22', spotter: 'Hans', trackingId: 1 },
    //    { date: '2024-04-20 23:46', spotter: 'Emma', trackingId: 3 }
    //  ],

    return h.view('birds/views/tracking/list-tracking', {
      pageTitle: 'Bird tracking',
      heading: 'Bird tracking',
      bird,
      trackings,
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
