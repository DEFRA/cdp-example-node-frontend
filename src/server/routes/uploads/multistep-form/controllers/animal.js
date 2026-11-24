import Joi from 'joi'

import { provideAnimal } from '../helpers/pre/provide-animal.js'

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

    return h.view('uploads/multistep-form/views/animal', {
      pageTitle: 'Animal',
      heading: 'Animal',
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
          text: 'Animal'
        }
      ],
      animal
    })
  }
}

export { animalController }
