import { buildOptions } from '../../common/helpers/options/build-options.js'
import { animalNames } from '../constants/animal-names.js'
import _ from 'lodash'

const kindFormController = {
  handler: async (request, h) => {
    return h.view('animals/views/kind-form', {
      pageTitle: 'Kind',
      action: '/animals/add/kind',
      heading: 'Kind',
      kindsOfAnimals: buildOptions(
        animalNames.map((animal) => ({
          value: animal,
          text: _.upperFirst(animal)
        }))
      ),
      breadcrumbs: [
        {
          text: 'Animals',
          href: '/animals'
        },
        {
          text: 'Details',
          href: '/animals/add/details'
        },
        {
          text: 'Kind'
        }
      ]
    })
  }
}

export { kindFormController }
