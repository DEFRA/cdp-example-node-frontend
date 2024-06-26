import { config } from '~/src/config'
import { initUpload } from '~/src/server/common/helpers/upload/init-upload'
import { providePlantSession } from '~/src/server/plants/helpers/pre/provide-plant-session'
import { sessionNames } from '~/src/server/common/constants/session-names'

const uploadFormController = {
  options: {
    pre: [providePlantSession]
  },
  handler: async (request, h) => {
    const plantSession = request.pre.plantSession
    const s3Bucket = config.get('bucket')

    const uploadDetail = await initUpload({
      redirect: `/plants/add/upload-status-poller`,
      s3Bucket,
      s3Path: 'plants',
      mimeTypes: ['image/png', 'image/jpeg'],
      metadata: { plantId: plantSession?.plantId }
    })

    request.yar.set(sessionNames.plants, {
      ...plantSession,
      ...uploadDetail
    })

    return h.view('plants/views/upload-form', {
      pageTitle: 'Upload pictures',
      plantSession,
      action: uploadDetail.uploadUrl,
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
