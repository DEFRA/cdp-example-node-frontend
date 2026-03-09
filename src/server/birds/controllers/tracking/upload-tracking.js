import { config } from '../../../../config/config.js'
import { sessionNames } from '../../../common/constants/session-names.js'
import { trackingValidation } from '../../helpers/schemas/bird-validation.js'
import { birds } from '../../data/birds.js'
import { findBirdById } from '../../helpers/find-bird.js'
import { initUpload } from '../../../common/helpers/upload/init-upload.js'
import { findTracking } from '../../helpers/fetch/find-tracking.js'
import { setStatusTrackingUrl } from '../../helpers/fetch/update-tracking-status-url.js'

const s3Bucket = config.get('bucket')
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

    const { tracking } = await findTracking(bird, trackingId)

    if (!tracking) {
      request.logger.info({ birdId, trackingId }, 'Tracking not found')
      return h.redirect(`/birds/${birdId}/tracking`)
    }

    request.logger.debug({ tracking }, 'Tracking found')

    const redirect = `/birds/${birdId}/tracking/${trackingId}/uploaded`
    const callback = `${backendUrl}/birds/${birdId}/tracking/${trackingId}/callback`

    const secureUpload = await initUpload({
      redirect,
      callback,
      s3Bucket,
      s3Path: 'birds/tracking',
      mimeTypes: ['text/csv', 'text/plain']
    })

    request.logger.debug({ secureUpload }, 'Secure upload')

    await setStatusTrackingUrl(bird, trackingId, secureUpload.statusUrl)

    return h.view('birds/views/tracking/upload-tracking', {
      pageTitle: `Tracking ${bird.name}`,
      heading: `Tracking ${bird.name}`,
      action: secureUpload.uploadUrl,
      bird,
      birdId,
      spotter: tracking.spotter,
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
