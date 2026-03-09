import _ from 'lodash'

// TODO check this
const noSessionRedirect = {
  method: async (request, h) => {
    const creatureSession = await request.redis.getData(
      request.params.creatureId
    )

    if (_.isNull(creatureSession)) {
      return h.redirect('/creatures/add').takeover()
    }

    return h.continue
  }
}

export { noSessionRedirect }
