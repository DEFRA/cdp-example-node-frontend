import Joi from 'joi'

import { config } from '~/src/config'
import { sessionNames } from '~/src/server/common/constants/session-names'
import { trackingValidation } from '~/src/server/birds/helpers/schemas/bird-validation'
import { birds } from '~/src/server/birds/data/birds'
import { findBirdById } from '~/src/server/birds//helpers/find-bird'
import { initUpload } from '~/src/server/common/helpers/upload/init-upload'
import { findTrackingById } from '~/src/server/birds/helpers/find-tracking'
import { setStatusTrackingUrl } from '~/src/server/birds/helpers/update-tracking-status-url'

const destinationBucket = config.get('bucket')
const appBaseUrl = config.get('appBaseUrl')
const backendUrl = config.get('cdpExampleNodeBackendUrl')

const showTrackingUploadController = {
  options: {
    validate: {
      params: trackingValidation
    }
  },
  handler: async (request, h) => {
    request.yar.clear(sessionNames.validationFailure)
    const birdId = request.params.birdId
    const trackingId = request.params.trackingId

    const bird = findBirdById(birdId)

    if (!bird) {
      console.log({ birdId, birds }, 'Bird not found')
      return h.redirect('/birds')
    }

    const tracking = findTrackingById(birdId, trackingId)

    if (!tracking) {
      console.log({ birdId, trackingId }, 'Tracking not found')
      return h.redirect(`/birds/${birdId}/tracking`)
    }

    const redirectUrl = `${appBaseUrl}/birds/${birdId}/tracking/${trackingId}/uploaded`
    const callbackUrl = `${backendUrl}/birds/${birdId}/tracking/${trackingId}/callback`

    const secureUpload = await initUpload({
      successRedirect: redirectUrl,
      failureRedirect: redirectUrl,
      scanResultCallbackUrl: callbackUrl,
      destinationBucket,
      destinationPath: '/birds/tracking'
    })

    await setStatusTrackingUrl(birdId, trackingId, secureUpload.statusUrl)

    return h.view('birds/views/tracking/upload-tracking', {
      pageTitle: `Tracking ${bird.name}`,
      heading: `Tracking ${bird.name}`,
      action: secureUpload.uploadUrl,
      bird,
      birdId,
      tracking,
      trackingId,
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
          text: 'Tracking',
          href: `/birds/${birdId}/tracking/${trackingId}`
        },
        {
          text: 'Upload'
        }
      ]
    })
  }
}

export { showTrackingUploadController }
