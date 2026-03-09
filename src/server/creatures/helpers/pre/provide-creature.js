import { getCreature } from '../fetch/get-creature.js'

const provideCreature = {
  method: async (request, h) => {
    const { creature } = (await getCreature(request.params.creatureId)) ?? {}

    if (creature) {
      return creature
    }

    return null
  },
  assign: 'creature'
}

export { provideCreature }
