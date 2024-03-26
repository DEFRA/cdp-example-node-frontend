import { sessionNames } from '~/src/server/common/constants/session-names'
import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'

const startController = {
  handler: async (request, h) => {
    request.yar.clear(sessionNames.animals)
    request.yar.clear(sessionNames.validationFailure)

    await saveToAnimal(request, h, {})

    return h.redirect('/animals/add/details')
  }
}

export { startController }
