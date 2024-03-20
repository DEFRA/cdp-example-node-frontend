import {
  uploadFormController,
  uploadController,
  uploadSuccessController,
  uploadFailureController,
  animalListController,
  animalController
} from '~/src/server/animals/controllers'

const animals = {
  plugin: {
    name: 'animals',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/animals',
          ...animalListController
        },
        {
          method: 'GET',
          path: '/animals/{id}',
          ...animalController
        },
        {
          method: 'GET',
          path: '/animals/upload',
          ...uploadFormController
        },
        {
          method: 'POST',
          path: '/animals/upload',
          ...uploadController
        },
        {
          method: 'GET',
          path: '/animals/upload/success',
          ...uploadSuccessController
        },
        {
          method: 'GET',
          path: '/animals/upload/failure',
          ...uploadFailureController
        }
      ])
    }
  }
}

export { animals }
