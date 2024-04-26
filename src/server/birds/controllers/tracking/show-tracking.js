import Joi from 'joi'

import { sessionNames } from '~/src/server/common/constants/session-names'
import {
  birdValidation,
  trackingValidation
} from '~/src/server/birds/helpers/schemas/bird-validation'
import { birds } from '~/src/server/birds/data/birds'
import { findBirdById } from '~/src/server/birds//helpers/find-bird'

const showTrackingUploadController = {
  options: {
    validate: {
      params: trackingValidation
      // params: Joi.object({
      //   birdId: Joi.number().integer().positive().optional(),
      //   trackingId: Joi.string().uuid().optional()
      // })
    }
  },
  handler: async (request, h) => {
    console.log('=====')
    request.yar.clear(sessionNames.validationFailure)
    const birdId = request.params.birdId
    const trackingId = request.params.trackingId

    const bird = findBirdById(birdId)

    if (!bird) {
      console.log({ birdId, birds }, 'Bird not found')
      return h.redirect('/birds')
    }

    const tracking = {}

    return h.view('birds/views/tracking/show-tracking', {
      pageTitle: `Tracking ${bird.name}`,
      heading: `Tracking ${bird.name}`,
      bird,
      birdId,
      tracking,
      trackingId
    })
  }
}

export { showTrackingUploadController }
