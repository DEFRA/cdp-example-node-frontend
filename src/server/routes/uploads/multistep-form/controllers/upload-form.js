import { config } from '#/config/config.js'
import { initUpload } from '#/server/routes/uploads/common/helpers/init-upload.js'
import { saveToAnimal } from '../helpers/form/save-to-animal.js'

const uploadFormController = {
  handler: async (request, h) => {
    const s3Bucket = config.get('bucket')

    const uploadDetail = await initUpload({
      redirect: `/uploads/multistep-form/add/upload-status-poller`,
      s3Bucket,
      s3Path: 'animals',
      maxFileSize: 1024 * 1024 * 100,
      mimeTypes: ['image/png', 'image/jpeg', 'image/gif']
    })

    await saveToAnimal(request, h, uploadDetail)

    return h.view('uploads/multistep-form/views/upload-form', {
      pageTitle: 'Add animal',
      action: uploadDetail.uploadUrl,
      heading: 'Seen an Animal?',
      breadcrumbs: [
        {
          text: 'File uploads',
          href: '/uploads'
        },
        {
          text: 'In a multistep form',
          href: '/uploads/multistep-form'
        },
        {
          text: 'Details',
          href: '/uploads/multistep-form/add/details'
        },
        {
          text: 'Kind',
          href: '/uploads/multistep-form/add/kind'
        },
        {
          text: 'Upload picture'
        }
      ]
    })
  }
}

export { uploadFormController }
