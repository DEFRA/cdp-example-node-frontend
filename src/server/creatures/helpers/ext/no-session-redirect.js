import _ from 'lodash'

// TODO check this
const noSessionRedirect = {
  method: async (request, h) => {
    const creatureSession = request.yar.get(request.params.creatureId)

    if (_.isNull(creatureSession)) {
      return h.redirect('/creatures/add').takeover()
    }

    return h.continue
  }
}

export { noSessionRedirect }
