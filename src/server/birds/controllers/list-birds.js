import { sessionNames } from '~/src/server/common/constants/session-names'
import { birds } from '~/src/server/birds/data/birds'

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
