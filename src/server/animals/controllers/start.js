import { sessionNames } from '../../common/constants/session-names.js'
import { saveToAnimal } from '../helpers/form/save-to-animal.js'

const startController = {
  handler: async (request, h) => {
    request.yar.clear(sessionNames.animals)
    request.yar.clear(sessionNames.validationFailure)

    await saveToAnimal(request, h, {})

    return h.redirect('/animals/add/details')
  }
}

export { startController }
