import { sessionNames } from '../../common/constants/session-names.js'
import { birds } from '../data/birds.js'

const listBirdsController = {
  handler: async (request, h) => {
    request.yar.clear(sessionNames.validationFailure)
    return h.view('birds/views/list-birds', {
      pageTitle: 'Birds',
      heading: 'Birds',
      birds
    })
  }
}

export { listBirdsController }
