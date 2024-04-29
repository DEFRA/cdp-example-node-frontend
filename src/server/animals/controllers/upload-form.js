import { config } from '~/src/config'
import { initUpload } from '~/src/server/common/helpers/upload/init-upload'

const uploadFormController = {
  handler: async (request, h) => {
    const destinationBucket = config.get('bucket')
    const appBaseUrl = config.get('appBaseUrl')

    const uploadDetail = await initUpload({
      redirect: `${appBaseUrl}/animals/add/status-poller`,
      destinationBucket,
      destinationPath: 'animals'
    })

    return h.view('animals/views/upload-form', {
      pageTitle: 'Add animal',
      action: uploadDetail.uploadAndScanUrl,
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
