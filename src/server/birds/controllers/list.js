import { sessionNames } from '~/src/server/common/constants/session-names'

const listController = {
  handler: async (request, h) => {
    request.yar.clear(sessionNames.validationFailure)

    const birds = [] // await getBirds()

    return h.view('birds/views/list', {
      pageTitle: 'Birds',
      heading: 'Birds',
      birds
    })
  }
}

export { listController }
