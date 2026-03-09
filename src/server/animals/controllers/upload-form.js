import { config } from '../../../config/config.js'
import { initUpload } from '../../common/helpers/upload/init-upload.js'
import { saveToAnimal } from '../helpers/form/save-to-animal.js'

const uploadFormController = {
  handler: async (request, h) => {
    const s3Bucket = config.get('bucket')

    const uploadDetail = await initUpload({
      redirect: `/animals/add/upload-status-poller`,
      s3Bucket,
      s3Path: 'animals',
      maxFileSize: 1024 * 1024 * 100,
      mimeTypes: ['image/png', 'image/jpeg', 'image/gif']
    })

    await saveToAnimal(request, h, uploadDetail)

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
