import { fileController } from './file-controller.js'

const files = {
  plugin: {
    name: 'files',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/file/{s3Key}',
          ...fileController
        }
      ])
    }
  }
}

export { files }
