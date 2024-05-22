import crumb from '@hapi/crumb'

import { config } from '~/src/config'

const eightHours = 1000 * 60 * 60 * 8

const csrf = {
  plugin: {
    name: 'csrf',
    register: async (server) => {
      await server.register({
        plugin: crumb,
        options: {
          key: 'csrfToken',
          cookieOptions: {
            path: '/',
            password: config.get('sessionCookiePassword'),
            isSecure: config.get('isProduction'),
            ttl: eightHours
          }
        }
      })
    }
  }
}

export { csrf }
