import { randomUUID } from 'node:crypto'
import { sessionNames } from '~/src/server/common/constants/session-names'
import { saveToPlant } from '~/src/server/plants/helpers/form/save-to-plant'

const startController = {
  handler: async (request, h) => {
    request.yar.clear(sessionNames.plants)
    request.yar.clear(sessionNames.validationFailure)

    const plantId = randomUUID()
    await saveToPlant(request, h, { plantId })

    return h.redirect('/plants/add/details')
  }
}

export { startController }
