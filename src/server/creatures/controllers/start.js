import crypto from 'node:crypto'

import { sessionNames } from '~/src/server/common/constants/session-names'

const startController = {
  handler: async (request, h) => {
    request.yar.clear(sessionNames.validationFailure)

    const creatureId = crypto.randomUUID()

    await request.redis.storeData(creatureId, {
      creatureId
    })

    return h.redirect(`/creatures/${creatureId}/upload`)
  }
}

export { startController }
