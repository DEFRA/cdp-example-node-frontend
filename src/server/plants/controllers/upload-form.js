import { config } from '~/src/config'
import { initUpload } from '~/src/server/common/helpers/upload/init-upload'
import { saveToPlant } from '~/src/server/plants/helpers/form/save-to-plant'

const uploadFormController = {
  handler: async (request, h) => {
    const destinationBucket = config.get('bucket')
    const appBaseUrl = config.get('appBaseUrl')
    const nodeBackendUrl = config.get('cdpExampleNodeBackendUrl')

    const redirectUrl = `${appBaseUrl}/plants/add/status-poller`

    const secureUpload = await initUpload({
      successRedirect: redirectUrl, // TODO there will be only 1 redirect
      failureRedirect: redirectUrl, // TODO there will be only 1 redirect
      scanResultCallbackUrl: `${nodeBackendUrl}/callback`,
      acceptedMimeTypes: ['.pdf', '.csv', '.png', 'image/jpeg'],
      maxFileSize: 100,
      destinationBucket,
      destinationPath: '/animals'
    })

    await saveToPlant(request, h, { secureUpload })

    return h.view('plants/views/upload-form', {
      pageTitle: 'Add plant',
      action: secureUpload.url,
      heading: 'Seen a Plant?',
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
          text: 'Upload picture'
        }
      ]
    })
  }
}

export { uploadFormController }
