import { auditController } from '~/src/server/audit/controllers/audit-controller'
import { logController } from '~/src/server/audit/controllers/log-controller'

const auditingRoutes = {
  plugin: {
    name: 'audit',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/audit',
          ...auditController
        },
        {
          method: 'GET',
          path: '/log',
          ...logController
        }
      ])
    }
  }
}

export { auditingRoutes }
