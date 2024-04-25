import { sessionNames } from '~/src/server/common/constants/session-names'

const provideAnimalSession = {
  method: async (request, h) => request.yar.get(sessionNames.animals),
  assign: 'animalSession'
}

export { provideAnimalSession }
