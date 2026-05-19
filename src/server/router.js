import inert from '@hapi/inert'

import { home } from './home/index.js'
import { health } from './health/index.js'
import { serveStaticFiles } from './common/helpers/serve-static-files.js'
import { basicUpload } from './basic-upload/index.js'
import { files } from './files/index.js'
import { animals } from './animals/index.js'
import { birds } from './birds/index.js'
import { plants } from './plants/index.js'
import { creatures } from './creatures/index.js'

export const router = {
  plugin: {
    name: 'router',
    async register(server) {
      await server.register([inert])

      // Health-check route. Used by platform to check if service is running, do not remove!
      await server.register([health])

      // Application specific routes, add your own routes here
      await server.register([
        home,
        animals,
        basicUpload,
        birds,
        creatures,
        plants,
        files
      ])

      // Static assets
      await server.register([serveStaticFiles])
    }
  }
}
