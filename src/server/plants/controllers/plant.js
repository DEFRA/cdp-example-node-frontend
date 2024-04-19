import Joi from 'joi'

import { providePlant } from '~/src/server/plants/helpers/pre/provide-plant'

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

    return h.view('plants/views/plant', {
      pageTitle: 'Plant',
      heading: 'Plant',
      breadcrumbs: [
        {
          text: 'Plants',
          href: '/plants'
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
