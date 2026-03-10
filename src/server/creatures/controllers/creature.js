import Joi from 'joi'
import { provideCreature } from '../helpers/pre/provide-creature.js'

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
          text: 'Creature',
          href: '/creature'
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
