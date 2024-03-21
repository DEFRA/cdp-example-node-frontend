import { sessionNames } from '~/src/server/common/constants/session-names'
import { fetchStatus } from '~/src/server/common/helpers/upload/fetch-status'
import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'

async function saveUploadStatus(request, h) {
  const animalsSession = request.yar.get(sessionNames.animals)
  const uploadStatus = await fetchStatus(animalsSession.uploadId)

  await saveToAnimal(request, h, { uploadStatus })
}

export { saveUploadStatus }
