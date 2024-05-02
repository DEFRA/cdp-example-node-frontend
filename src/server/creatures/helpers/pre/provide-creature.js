import { getCreature } from '~/src/server/creatures/helpers/fetch/get-creature'

const provideCreature = {
  method: async (request, h) => {
    const { creature } = (await getCreature(request.params.creatureId)) ?? {}

    if (creature) {
      const fileUrl = '/file/' + creature.fileUrl
      delete creature.creatureId

      return {
        ...creature,
        fileUrl
      }
    }

    return null
  },
  assign: 'creature'
}

export { provideCreature }
