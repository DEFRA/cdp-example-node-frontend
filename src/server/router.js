import inert from '@hapi/inert'

import { health } from '~/src/server/health'
import { home } from '~/src/server/home'
import { creatures } from '~/src/server/creatures'
import { animals } from '~/src/server/animals'
import { plants } from '~/src/server/plants'
import { birds } from '~/src/server/birds'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files'
import { files } from '~/src/server/files'

const router = {
  plugin: {
    name: 'router',
    register: async (server) => {
      await server.register([inert])
      await server.register([
        health,
        home,
        animals,
        birds,
        plants,
        creatures,
        files,
        serveStaticFiles
      ])
    }
  }
}

export { router }
