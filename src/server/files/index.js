import { fileController } from '~/src/server/files/file-controller'

const files = {
  plugin: {
    name: 'files',
    register: async (server) => {
      server.route({
        method: 'GET',
        path: '/file/{id}/{fileName}',
        ...fileController
      })
    }
  }
}

export { files }
