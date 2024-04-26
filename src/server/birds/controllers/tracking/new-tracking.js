import { sessionNames } from '~/src/server/common/constants/session-names'
import { birds } from '~/src/server/birds/data/birds'

const newTrackingController = {
  handler: async (request, h) => {
    request.yar.clear(sessionNames.validationFailure)

    const birdsAsInput = birds.map((bird) => ({
      text: `${bird.name}: ${bird.genus} ${bird.species}`,
      value: bird.birdId
    }))

    return h.view('birds/views/tracking/new-tracking', {
      pageTitle: 'Bird Tracking',
      heading: 'Bird Tracking',
      action: '/birds/tracking',
      birds: [
        {
          text: ' - - select - - ',
          disabled: true,
          attributes: { selected: true }
        },
        ...birdsAsInput
      ],
      breadcrumbs: [
        {
          text: 'Birds',
          href: '/birds'
        },
        {
          text: 'Tracking'
        }
      ]
    })
  }
}

export { newTrackingController }
