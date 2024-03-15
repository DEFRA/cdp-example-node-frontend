import {
  uploadFormController,
  uploadController,
  uploadSuccessController,
  uploadFailureController,
  creatureListController,
  creatureController
} from '~/src/server/creatures/controllers'

const creatures = {
  plugin: {
    name: 'creatures',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/creatures',
          ...creatureListController
        },
        {
          method: 'GET',
          path: '/creatures/{id}',
          ...creatureController
        },
        {
          method: 'GET',
          path: '/creatures/upload',
          ...uploadFormController
        },
        {
          method: 'POST',
          path: '/creatures/upload',
          ...uploadController
        },
        {
          method: 'GET',
          path: '/creatures/upload/success',
          ...uploadSuccessController
        },
        {
          method: 'GET',
          path: '/creatures/upload/failure',
          ...uploadFailureController
        }
      ])
    }
  }
}

export { creatures }
