import { sessionNames } from '~/src/server/common/constants/session-names'
import { fetchStatus } from '~/src/server/common/helpers/upload/fetch-status'
import { saveToPlant } from '~/src/server/plants/helpers/form/save-to-plant'

async function savePlantsUploadStatus(request, h) {
  const plantsSession = request.yar.get(sessionNames.plants)
  const uploadId = plantsSession?.secureUpload?.id

  if (uploadId) {
    const uploadStatus = await fetchStatus(uploadId)

    await saveToPlant(request, h, { uploadStatus })
  }
}

export { savePlantsUploadStatus }
