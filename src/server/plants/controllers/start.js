import { sessionNames } from '~/src/server/common/constants/session-names'
import { saveToPlant } from '~/src/server/plants/helpers/form/save-to-plant'

const startController = {
  handler: async (request, h) => {
    request.yar.clear(sessionNames.plants)
    request.yar.clear(sessionNames.validationFailure)

    await saveToPlant(request, h, {})

    return h.redirect('/plants/add/details')
  }
}

export { startController }
