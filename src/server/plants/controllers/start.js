import { randomUUID } from 'node:crypto'
import { sessionNames } from '../../common/constants/session-names.js'
import { saveToPlant } from '../helpers/form/save-to-plant.js'

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
