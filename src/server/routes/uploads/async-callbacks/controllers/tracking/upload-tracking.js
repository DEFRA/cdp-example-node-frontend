import { config } from '#/config/config.js'
import { sessionNames } from '#/server/common/constants/session-names.js'
import { trackingValidation } from '../../helpers/schemas/bird-validation.js'
import { birds } from '../../data/birds.js'
import { findBirdById } from '../../helpers/find-bird.js'
import { initUpload } from '#/server/routes/uploads/common/helpers/init-upload.js'
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
      return h.redirect('/uploads/async-callbacks')
    }

    const { tracking } = await findTracking(bird, trackingId)

    if (!tracking) {
      request.logger.info({ birdId, trackingId }, 'Tracking not found')
      return h.redirect(`/uploads/async-callbacks/${birdId}/tracking`)
    }

    request.logger.debug({ tracking }, 'Tracking found')

    const redirect = `/uploads/async-callbacks/${birdId}/tracking/${trackingId}/uploaded`
    const callback = `${backendUrl}/uploads/async-callbacks/birds/${birdId}/tracking/${trackingId}/callback`

    const secureUpload = await initUpload({
      redirect,
      callback,
      s3Bucket,
      s3Path: 'birds/tracking',
      mimeTypes: ['text/csv', 'text/plain']
    })

    request.logger.debug({ secureUpload }, 'Secure upload')

    await setStatusTrackingUrl(bird, trackingId, secureUpload.statusUrl)

    return h.view('uploads/async-callbacks/views/tracking/upload-tracking', {
      pageTitle: `Tracking ${bird.name}`,
      heading: `Tracking ${bird.name}`,
      action: secureUpload.uploadUrl,
      bird,
      birdId,
      spotter: tracking.spotter,
      trackingId,
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
          text: bird.name,
          href: `/uploads/async-callbacks/${birdId}`
        },
        {
          text: 'Tracking',
          href: `/uploads/async-callbacks/${birdId}/tracking/${trackingId}`
        },
        {
          text: 'Upload'
        }
      ]
    })
  }
}

export { showTrackingUploadController }
