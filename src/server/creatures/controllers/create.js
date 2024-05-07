import { sessionNames } from '~/src/server/common/constants/session-names'
import { provideCreatureSession } from '~/src/server/creatures/helpers/pre/provide-creature-session'
import { createCreature } from '~/src/server/creatures/helpers/fetch/create-creature'

const createController = {
  options: {
    pre: [provideCreatureSession]
  },
  handler: async (request, h) => {
    const creatureSession = request.pre.creatureSession

    const json = await createCreature(creatureSession)

    const kind = json?.creature?.kind

    request.yar.flash(sessionNames.notifications, {
      text: `Creature ${kind} added`,
      type: 'success'
    })

    await request.redis.removeData(creatureSession.creatureId)

    return h.redirect('/creatures')
  }
}

export { createController }
