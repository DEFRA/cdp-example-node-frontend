import crypto from 'node:crypto'

import { sessionNames } from '#/server/common/constants/session-names.js'

const startController = {
  handler: async (request, h) => {
    request.yar.clear(sessionNames.creatures)
    request.yar.clear(sessionNames.validationFailure)

    const creatureId = crypto.randomUUID()

    request.yar.set(creatureId, {
      creatureId
    })

    return h.redirect(`/uploads/multiple-files/${creatureId}/upload`)
  }
}

export { startController }
