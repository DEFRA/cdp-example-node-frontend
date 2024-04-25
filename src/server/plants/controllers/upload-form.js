import { config } from '~/src/config'
import { initUpload } from '~/src/server/common/helpers/upload/init-upload'
import { providePlantSession } from '~/src/server/plants/helpers/pre/provide-plant-session'

const uploadFormController = {
  options: {
    pre: [providePlantSession]
  },
  handler: async (request, h) => {
    const plantSession = request.pre.plantSession
    const destinationBucket = config.get('bucket')
    const appBaseUrl = config.get('appBaseUrl')
    const redirectUrl = `${appBaseUrl}/plants/add/status-poller`

    const secureUpload = await initUpload({
      successRedirect: redirectUrl,
      failureRedirect: redirectUrl,
      acceptedMimeTypes: ['.pdf', '.csv', '.png', 'image/jpeg'],
      maxFileSize: 100,
      destinationBucket,
      destinationPath: '/animals',
      metadata: { plantId: plantSession?.plantId }
    })

    return h.view('plants/views/upload-form', {
      pageTitle: 'Upload pictures',
      plantSession,
      action: secureUpload.uploadUrl,
      heading: 'Upload pictures',
      breadcrumbs: [
        {
          text: 'Plants',
          href: '/plants'
        },
        {
          text: 'Details',
          href: '/plants/add/details'
        },
        {
          text: 'Upload pictures'
        }
      ]
    })
  }
}

export { uploadFormController }
