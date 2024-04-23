import { sessionNames } from '~/src/server/common/constants/session-names'
import { fetchStatus } from '~/src/server/common/helpers/upload/fetch-status'
import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'

// TODO what is this doing?
// This is fetching the status of an upload and saving its result to the session - refactor, this is overkill
async function saveAnimalsUploadStatus(request, h) {
  const animalsSession = request.yar.get(sessionNames.animals)
  const uploadId = animalsSession?.secureUpload?.id

  if (uploadId) {
    const uploadStatus = await fetchStatus(uploadId)

    await saveToAnimal(request, h, { uploadStatus })
  }
}

export { saveAnimalsUploadStatus }
