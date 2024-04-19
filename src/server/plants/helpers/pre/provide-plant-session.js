import { sessionNames } from '~/src/server/common/constants/session-names'
import { savePlantsUploadStatus } from '~/src/server/plants/helpers/upload/save-plants-upload-status'

const providePlantSession = {
  method: async (request, h) => {
    await savePlantsUploadStatus(request, h)

    return request.yar.get(sessionNames.plants)
  },
  assign: 'plantSession'
}

export { providePlantSession }
