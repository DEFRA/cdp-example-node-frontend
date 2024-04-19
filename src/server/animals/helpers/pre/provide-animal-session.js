import { sessionNames } from '~/src/server/common/constants/session-names'
import { saveAnimalsUploadStatus } from '~/src/server/animals/helpers/upload/save-animals-upload-status'

const provideAnimalSession = {
  method: async (request, h) => {
    await saveAnimalsUploadStatus(request, h)

    return request.yar.get(sessionNames.animals)
  },
  assign: 'animalSession'
}

export { provideAnimalSession }
