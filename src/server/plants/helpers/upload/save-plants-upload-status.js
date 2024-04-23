import { sessionNames } from '~/src/server/common/constants/session-names'
import { fetchStatus } from '~/src/server/common/helpers/upload/fetch-status'
import { saveToPlant } from '~/src/server/plants/helpers/form/save-to-plant'

// TODO is this still needed?
// TODO what is this doing?
// This is fetching the status of an upload and saving its result to the session - refactor, this is overkill
async function savePlantsUploadStatus(request, h) {
  const plantsSession = request.yar.get(sessionNames.plants)
  const uploadId = plantsSession?.secureUpload?.id

  if (uploadId) {
    const uploadStatus = await fetchStatus(uploadId)

    await saveToPlant(request, h, { uploadStatus })
  }
}

export { savePlantsUploadStatus }
