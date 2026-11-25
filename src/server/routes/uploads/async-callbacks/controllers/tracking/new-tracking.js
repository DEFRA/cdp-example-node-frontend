import { sessionNames } from '#/server/common/constants/session-names.js'
import { birds } from '../../data/birds.js'

const newTrackingController = {
  handler: async (request, h) => {
    request.yar.clear(sessionNames.validationFailure)

    const birdsAsInput = birds.map((bird) => ({
      text: `${bird.name}: ${bird.genus} ${bird.species}`,
      value: bird.birdId
    }))

    return h.view('uploads/async-callbacks/views/tracking/new-tracking', {
      pageTitle: 'Bird Tracking',
      heading: 'Bird Tracking',
      action: '/uploads/async-callbacks/tracking',
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
          text: 'File uploads',
          href: '/uploads'
        },
        {
          text: 'Async callbacks',
          href: '/uploads/async-callbacks'
        },
        {
          text: 'Tracking'
        }
      ]
    })
  }
}

export { newTrackingController }
