import Joi from 'joi'

import { sessionNames } from '~/src/server/common/constants/session-names'
import { findBirdById } from '~/src/server/birds/helpers/find-bird'

const newBirdTrackingController = {
  options: {
    validate: {
      params: Joi.object({
        birdId: Joi.number().integer().positive().required()
      })
    }
  },
  handler: async (request, h) => {
    request.yar.clear(sessionNames.validationFailure)
    const { birdId } = request.params
    const bird = findBirdById(birdId)

    if (!bird) {
      return h.redirect('/birds')
    }

    return h.view('birds/views/tracking/new-bird-tracking', {
      pageTitle: `Tracking ${bird.name}`,
      heading: `Tracking ${bird.name}`,
      action: `/birds/${birdId}/tracking/spotter`,
      bird,
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
        },
        {
          text: 'Spotter'
        }
      ]
    })
  }
}

export { newBirdTrackingController }
