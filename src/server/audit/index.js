import { logController } from './controllers/log-controller.js'

const auditingRoutes = {
  plugin: {
    name: 'audit',
    register: async (server) => {
      server.route([
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
