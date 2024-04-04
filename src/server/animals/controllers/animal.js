import Joi from 'joi'

import { provideAnimal } from '~/src/server/animals/helpers/pre/provide-animal'

const animalController = {
  options: {
    pre: [provideAnimal],
    validate: {
      params: Joi.object({
        animalId: Joi.string().required()
      })
    }
  },
  handler: async (request, h) => {
    const animal = request.pre.animal

    return h.view('animals/views/animal', {
      pageTitle: 'Animal',
      heading: 'Animal',
      breadcrumbs: [
        {
          text: 'Animals',
          href: '/animals'
        },
        {
          text: 'Animal'
        }
      ],
      animal
    })
  }
}

export { animalController }
