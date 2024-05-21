import { config } from '~/src/config'
import { initUpload } from '~/src/server/common/helpers/upload/init-upload'

const uploadFormController = {
  handler: async (request, h) => {
    const s3Bucket = config.get('bucket')

    const uploadDetail = await initUpload({
      redirect: `/animals/add/upload-status-poller`,
      s3Bucket,
      s3Path: 'animals',
      maxFileSize: 1024 * 100,
      mimeTypes: ['image/png', 'image/jpeg', 'image/gif']
    })

    return h.view('animals/views/upload-form', {
      pageTitle: 'Add animal',
      action: uploadDetail.uploadUrl,
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
