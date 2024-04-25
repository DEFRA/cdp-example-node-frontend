import { listController } from '~/src/server/birds/controllers'
import { sessionNames } from '~/src/server/common/constants/session-names'
import { provideFormContextValues } from '~/src/server/common/helpers/form/provide-form-context-values'

const birds = {
  plugin: {
    name: 'birds',
    register: async (server) => {
      server.ext([
        {
          type: 'onPostHandler',
          method: provideFormContextValues(sessionNames.birds),
          options: {
            before: ['yar'],
            sandbox: 'plugin'
          }
        }
      ])

      server.route([
        {
          method: 'GET',
          path: '/birds',
          ...listController
        }
      ])
    }
  }
}

export { birds }
