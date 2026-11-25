import Joi from 'joi'

import { providePlant } from '../helpers/pre/provide-plant.js'

const plantController = {
  options: {
    pre: [providePlant],
    validate: {
      params: Joi.object({
        plantId: Joi.string().required()
      })
    }
  },
  handler: async (request, h) => {
    const plant = request.pre.plant

    return h.view('uploads/add-another/views/plant', {
      pageTitle: 'Plant',
      heading: 'Plant',
      breadcrumbs: [
        {
          text: 'File uploads',
          href: '/uploads'
        },
        {
          text: 'Add another file',
          href: '/uploads/add-another'
        },
        {
          text: 'Plant'
        }
      ],
      plant
    })
  }
}

export { plantController }
