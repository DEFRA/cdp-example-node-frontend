import { isNull } from 'lodash'

// TODO check this
const noSessionRedirect = {
  method: async (request, h) => {
    const creatureSession = await request.redis.getData(
      request.params.creatureId
    )

    if (isNull(creatureSession)) {
      return h.redirect('/creatures/add').takeover()
    }

    return h.continue
  }
}

export { noSessionRedirect }
