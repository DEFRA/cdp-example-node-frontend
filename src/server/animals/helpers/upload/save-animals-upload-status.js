import { sessionNames } from '~/src/server/common/constants/session-names'
import { fetchStatus } from '~/src/server/common/helpers/upload/fetch-status'
import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'

async function saveAnimalsUploadStatus(request, h) {
  const animalsSession = request.yar.get(sessionNames.animals)
  const uploadId = animalsSession?.secureUpload?.id

  if (uploadId) {
    const uploadStatus = await fetchStatus(uploadId)

    await saveToAnimal(request, h, { uploadStatus })
  }
}

export { saveAnimalsUploadStatus }
