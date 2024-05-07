import { buildOptions } from '~/src/server/common/helpers/options/build-options'
import { animalNames } from '~/src/server/animals/constants/animal-names'
import { upperFirst } from 'lodash'

const kindFormController = {
  handler: async (request, h) => {
    return h.view('animals/views/kind-form', {
      pageTitle: 'Kind',
      action: '/animals/add/kind',
      heading: 'Kind',
      kindsOfAnimals: buildOptions(
        animalNames.map((animal) => ({
          value: animal,
          text: upperFirst(animal)
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
