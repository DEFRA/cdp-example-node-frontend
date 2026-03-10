import { sessionNames } from '../../common/constants/session-names.js'
import { provideCreatureSession } from '../helpers/pre/provide-creature-session.js'
import { createCreature } from '../helpers/fetch/create-creature.js'

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

    request.yar.get(creatureSession.creatureId, true)

    return h.redirect('/creatures')
  }
}

export { createController }
