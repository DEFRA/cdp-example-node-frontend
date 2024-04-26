import { config } from '~/src/config'
import { initUpload } from '~/src/server/common/helpers/upload/init-upload'

const uploadFormController = {
  handler: async (request, h) => {
    const destinationBucket = config.get('bucket')
    const appBaseUrl = config.get('appBaseUrl')

    // TODO the uploader will accept only 1 callback url in the end
    const redirectUrl = `${appBaseUrl}/animals/add/status-poller`

    const secureUpload = await initUpload({
      successRedirect: redirectUrl,
      failureRedirect: redirectUrl,
      destinationBucket,
      destinationPath: '/animals'
    })

    return h.view('animals/views/upload-form', {
      pageTitle: 'Add animal',
      action: secureUpload.uploadUrl,
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
