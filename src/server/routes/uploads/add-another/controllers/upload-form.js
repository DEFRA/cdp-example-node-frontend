import { config } from '#/config/config.js'
import { initUpload } from '#/server/routes/uploads/common/helpers/init-upload.js'
import { providePlantSession } from '../helpers/pre/provide-plant-session.js'
import { sessionNames } from '#/server/common/constants/session-names.js'

const uploadFormController = {
  options: {
    pre: [providePlantSession]
  },
  handler: async (request, h) => {
    const plantSession = request.pre.plantSession
    const s3Bucket = config.get('bucket')

    const uploadDetail = await initUpload({
      redirect: `/uploads/add-another/add/upload-status-poller`,
      s3Bucket,
      s3Path: 'plants',
      mimeTypes: ['image/png', 'image/jpeg'],
      metadata: { plantId: plantSession?.plantId }
    })

    request.yar.set(sessionNames.plants, {
      ...plantSession,
      ...uploadDetail
    })

    return h.view('uploads/add-another/views/upload-form', {
      pageTitle: 'Upload pictures',
      plantSession,
      action: uploadDetail.uploadUrl,
      heading: 'Upload pictures',
      breadcrumbs: [
        {
          text: 'File uploads',
          href: '/uploads'
        },
        {
          text: 'Add another file',
          href: '/uploads/add-another'
        },
        {
          text: 'Details',
          href: '/uploads/add-another/add/details'
        },
        {
          text: 'Upload pictures'
        }
      ]
    })
  }
}

export { uploadFormController }
