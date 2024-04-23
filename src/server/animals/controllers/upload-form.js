import { config } from '~/src/config'
import { initUpload } from '~/src/server/common/helpers/upload/init-upload'
import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'

const uploadFormController = {
  handler: async (request, h) => {
    const destinationBucket = config.get('bucket')
    const appBaseUrl = config.get('appBaseUrl')
    const nodeBackendUrl = config.get('cdpExampleNodeBackendUrl')

    // TODO the uploader will accept only 1 callback url in the end
    const redirectUrl = `${appBaseUrl}/animals/add/status-poller`

    const secureUpload = await initUpload({
      successRedirect: redirectUrl,
      failureRedirect: redirectUrl,
      scanResultCallbackUrl: `${nodeBackendUrl}/callback`,
      acceptedMimeTypes: ['.pdf', '.csv', '.png', 'image/jpeg'],
      maxFileSize: 100,
      destinationBucket,
      destinationPath: '/animals'
    })

    await saveToAnimal(request, h, { secureUpload })

    return h.view('animals/views/upload-form', {
      pageTitle: 'Add animal',
      action: secureUpload.url,
      heading: 'Seen an Animal?',
      breadcrumbs: [
        {
          text: 'Animals',
          href: '/animals'
        },
        {
          text: 'Details',
          href: '/animals/add/details'
        },
        {
          text: 'Kind',
          href: '/animals/add/kind'
        },
        {
          text: 'Upload picture'
        }
      ]
    })
  }
}

export { uploadFormController }
