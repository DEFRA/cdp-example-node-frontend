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
import { provideFormContextValues } from '#/server/common/helpers/form/provide-form-context-values.js'
import { sessionNames } from '#/server/common/constants/session-names.js'

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
          path: '/uploads/multistep-form',
          ...animalListController
        },
        {
          method: 'GET',
          path: '/uploads/multistep-form/{animalId}',
          ...animalController
        },
        {
          method: 'GET',
          path: '/uploads/multistep-form/add',
          ...startController
        },
        {
          method: 'GET',
          path: '/uploads/multistep-form/add/details',
          ...detailsFormController
        },
        {
          method: 'POST',
          path: '/uploads/multistep-form/add/details',
          ...detailsController
        },
        {
          method: 'GET',
          path: '/uploads/multistep-form/add/kind',
          ...kindFormController
        },
        {
          method: 'POST',
          path: '/uploads/multistep-form/add/kind',
          ...kindController
        },
        {
          method: 'GET',
          path: '/uploads/multistep-form/add/upload-picture',
          ...uploadFormController
        },
        {
          method: 'GET',
          path: '/uploads/multistep-form/add/your-details',
          ...yourDetailsFormController
        },
        {
          method: 'POST',
          path: '/uploads/multistep-form/add/your-details',
          ...yourDetailsController
        },
        {
          method: 'GET',
          path: '/uploads/multistep-form/add/summary',
          ...summaryFormController
        },
        {
          method: 'POST',
          path: '/uploads/multistep-form/add/create',
          ...createController
        },
        {
          method: 'GET',
          path: '/uploads/multistep-form/add/upload-status-poller',
          ...uploadStatusPollerController
        }
      ])
    }
  }
}

export { animals }
