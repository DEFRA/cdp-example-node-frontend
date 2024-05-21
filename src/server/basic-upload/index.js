import { basicUploadFormController } from '~/src/server/basic-upload/controllers/basic-upload-form'
import { baseUploadCompleteController } from '~/src/server/basic-upload/controllers/basic-upload-complete'

const basicUpload = {
  plugin: {
    name: 'basic',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/basic',
          ...basicUploadFormController
        },
        {
          method: 'GET',
          path: '/basic/complete',
          ...baseUploadCompleteController
        }
      ])
    }
  }
}

export { basicUpload }
