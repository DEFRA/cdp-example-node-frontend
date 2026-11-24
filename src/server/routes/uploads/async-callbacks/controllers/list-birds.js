import { sessionNames } from '#/server/common/constants/session-names.js'
import { birds } from '../data/birds.js'

const listBirdsController = {
  handler: async (request, h) => {
    request.yar.clear(sessionNames.validationFailure)
    return h.view('uploads/async-callbacks/views/list-birds', {
      pageTitle: 'Upload with async callbacks',
      heading: 'Upload with async callbacks',
      birds
    })
  }
}

export { listBirdsController }
