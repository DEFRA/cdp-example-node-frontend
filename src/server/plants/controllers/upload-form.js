import { config } from '~/src/config'
import { initUpload } from '~/src/server/common/helpers/upload/init-upload'
import { providePlantSession } from '~/src/server/plants/helpers/pre/provide-plant-session'

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
      metadata: { plantId: plantSession?.plantId }
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
