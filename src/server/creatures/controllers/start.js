import crypto from 'node:crypto'

import { sessionNames } from '../../common/constants/session-names.js'

const startController = {
  handler: async (request, h) => {
    request.yar.clear(sessionNames.creatures)
    request.yar.clear(sessionNames.validationFailure)

    const creatureId = crypto.randomUUID()

    request.yar.set(creatureId, {
      creatureId
    })

    return h.redirect(`/creatures/${creatureId}/upload`)
  }
}

export { startController }
