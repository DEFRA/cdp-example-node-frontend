import inert from '@hapi/inert'

import { health } from '~/src/server/health'
import { home } from '~/src/server/home'
import { creatures } from '~/src/server/creatures'
import { animals } from '~/src/server/animals'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files'

const router = {
  plugin: {
    name: 'router',
    register: async (server) => {
      await server.register([inert])
      await server.register([
        health,
        home,
        animals,
        creatures,
        serveStaticFiles
      ])
    }
  }
}

export { router }
