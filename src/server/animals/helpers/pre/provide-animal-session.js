import { sessionNames } from '~/src/server/common/constants/session-names'
import { saveUploadStatus } from '~/src/server/common/helpers/upload/save-upload-status'

const provideAnimalSession = {
  method: async (request, h) => {
    await saveUploadStatus(request, h)

    return request.yar.get(sessionNames.animals)
  },
  assign: 'animalSession'
}

export { provideAnimalSession }
