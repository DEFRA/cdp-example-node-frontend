import { sessionNames } from '../../../common/constants/session-names.js'

const provideAnimalSession = {
  method: async (request, h) => request.yar.get(sessionNames.animals),
  assign: 'animalSession'
}

export { provideAnimalSession }
