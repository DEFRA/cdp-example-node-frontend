import { config } from '~/src/config'
import { sessionNames } from '~/src/server/common/constants/session-names'
import { trackingValidation } from '~/src/server/birds/helpers/schemas/bird-validation'
import { birds } from '~/src/server/birds/data/birds'
import { findBirdById } from '~/src/server/birds//helpers/find-bird'
import { initUpload } from '~/src/server/common/helpers/upload/init-upload'
import { findTracking } from '~/src/server/birds/helpers/fetch/find-tracking'
import { setStatusTrackingUrl } from '~/src/server/birds/helpers/fetch/update-tracking-status-url'

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
      request.logger.warn({ birdId, birds }, 'Bird not found')
      return h.redirect('/birds')
    }

    const tracking = await findTracking(bird, trackingId)

    if (!tracking) {
      request.logger.info({ birdId, trackingId }, 'Tracking not found')
      return h.redirect(`/birds/${birdId}/tracking`)
    }

    request.logger.debug({ tracking }, 'Tracking found')

    const redirectUrl = `${appBaseUrl}/birds/${birdId}/tracking/${trackingId}/uploaded`
    const callbackUrl = `${backendUrl}/birds/${birdId}/tracking/${trackingId}/callback`

    const secureUpload = await initUpload({
      redirect: redirectUrl,
      scanResultCallbackUrl: callbackUrl,
      destinationBucket,
      destinationPath: 'birds/tracking'
    })

    request.logger.debug({ secureUpload }, 'Secure upload')

    await setStatusTrackingUrl(bird, trackingId, secureUpload.statusUrl)

    return h.view('birds/views/tracking/upload-tracking', {
      pageTitle: `Tracking ${bird.name}`,
      heading: `Tracking ${bird.name}`,
      action: secureUpload.uploadAndScanUrl,
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
