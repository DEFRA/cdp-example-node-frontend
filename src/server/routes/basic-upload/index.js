import { basicUploadFormController } from './controllers/basic-upload-form.js'
import { baseUploadCompleteController } from './controllers/basic-upload-complete.js'

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
