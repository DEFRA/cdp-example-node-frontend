import { sessionNames } from '../../common/constants/session-names.js'
import { birds } from '../data/birds.js'

const listBirdsController = {
  handler: async (request, h) => {
    request.yar.clear(sessionNames.validationFailure)
    const largeHeader = 'x'.repeat(20000)
    const response = h.view('birds/views/list-birds', {
      pageTitle: 'Birds',
      heading: 'Birds',
      birds
    })
    if (request.query.largeHeader === '1') {
      response.header('X-Large-Test', 'x'.repeat(20000))
    }
    return response
  }
}

export { listBirdsController }
