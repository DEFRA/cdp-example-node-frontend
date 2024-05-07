import Joi from 'joi'
import { provideCreature } from '~/src/server/creatures/helpers/pre/provide-creature'

const creatureController = {
  options: {
    pre: [provideCreature],
    validate: {
      params: Joi.object({
        creatureId: Joi.string().required()
      })
    }
  },
  handler: async (request, h) => {
    const creature = request.pre.creature
    return h.view('creatures/views/creature', {
      pageTitle: 'Creature',
      heading: 'Creature',
      breadcrumbs: [
        {
          text: 'Creatures',
          href: '/creatures'
        },
        {
          text: 'Creature'
        }
      ],
      creature
    })
  }
}

export { creatureController }
