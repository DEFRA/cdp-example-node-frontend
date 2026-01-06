import { auditController } from '~/src/server/audit/controllers/audit-controller'

const auditingRoutes = {
  plugin: {
    name: 'audit',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/audit',
          ...auditController
        }
      ])
    }
  }
}

export { auditingRoutes }
