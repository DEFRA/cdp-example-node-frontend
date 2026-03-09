import {
  startController,
  detailsFormController,
  detailsController,
  kindFormController,
  kindController,
  yourDetailsFormController,
  yourDetailsController,
  uploadFormController,
  summaryFormController,
  createController,
  animalListController,
  animalController,
  uploadStatusPollerController
} from './controllers/index.js'
import { provideFormContextValues } from '../common/helpers/form/provide-form-context-values.js'
import { sessionNames } from '../common/constants/session-names.js'

const animals = {
  plugin: {
    name: 'animals',
    register: async (server) => {
      server.ext([
        {
          type: 'onPostHandler',
          method: provideFormContextValues(sessionNames.animals),
          options: {
            before: ['yar'],
            sandbox: 'plugin'
          }
        }
      ])

      server.route([
        {
          method: 'GET',
          path: '/animals',
          ...animalListController
        },
        {
          method: 'GET',
          path: '/animals/{animalId}',
          ...animalController
        },
        {
          method: 'GET',
          path: '/animals/add',
          ...startController
        },
        {
          method: 'GET',
          path: '/animals/add/details',
          ...detailsFormController
        },
        {
          method: 'POST',
          path: '/animals/add/details',
          ...detailsController
        },
        {
          method: 'GET',
          path: '/animals/add/kind',
          ...kindFormController
        },
        {
          method: 'POST',
          path: '/animals/add/kind',
          ...kindController
        },
        {
          method: 'GET',
          path: '/animals/add/upload-picture',
          ...uploadFormController
        },
        {
          method: 'GET',
          path: '/animals/add/your-details',
          ...yourDetailsFormController
        },
        {
          method: 'POST',
          path: '/animals/add/your-details',
          ...yourDetailsController
        },
        {
          method: 'GET',
          path: '/animals/add/summary',
          ...summaryFormController
        },
        {
          method: 'POST',
          path: '/animals/add/create',
          ...createController
        },
        {
          method: 'GET',
          path: '/animals/add/upload-status-poller',
          ...uploadStatusPollerController
        }
      ])
    }
  }
}

export { animals }
