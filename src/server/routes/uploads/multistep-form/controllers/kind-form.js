import { buildOptions } from '#/server/common/helpers/options/build-options.js'
import { animalNames } from '../constants/animal-names.js'
import _ from 'lodash'

const kindFormController = {
  handler: async (request, h) => {
    return h.view('uploads/multistep-form/views/kind-form', {
      pageTitle: 'Kind',
      action: '/uploads/multistep-form/add/kind',
      heading: 'Kind',
      kindsOfAnimals: buildOptions(
        animalNames.map((animal) => ({
          value: animal,
          text: _.upperFirst(animal)
        }))
      ),
      breadcrumbs: [
        {
          text: 'File uploads',
          href: '/uploads'
        },
        {
          text: 'In a multistep form',
          href: '/uploads/multistep-form'
        },
        {
          text: 'Details',
          href: '/uploads/multistep-form/add/details'
        },
        {
          text: 'Kind'
        }
      ]
    })
  }
}

export { kindFormController }
