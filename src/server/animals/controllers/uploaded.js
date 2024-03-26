import { provideAnimalSession } from '~/src/server/animals/helpers/pre/provide-animal-session'
import { fetchStatus } from '~/src/server/common/helpers/upload/fetch-status'
import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'

const uploadedController = {
  options: {
    pre: [provideAnimalSession]
  },
  handler: async (request, h) => {
    const animalSession = request.pre.animalSession

    const uploadId = animalSession?.secureUpload?.id
    const uploadStatus = await fetchStatus(uploadId)

    const hasPassedVirusCheck = uploadStatus?.scanResult?.safe
    const delivered = uploadStatus?.delivered
    const fileUrl = uploadStatus?.scanResult?.fileUrl

    const hasUploadedFile = uploadStatus?.fields?.file?.fileName

    if (!hasUploadedFile) {
      await saveToAnimal(request, h, { error: { file: 'Choose a file' } })

      return h.redirect('/animals/add/upload-picture')
    }

    if (hasPassedVirusCheck === false) {
      await saveToAnimal(request, h, { error: { file: 'Virus check failed' } })
      return h.redirect('/animals/add/upload-picture')
    }

    if (hasPassedVirusCheck && delivered && fileUrl) {
      await saveToAnimal(request, h, { fileUrl, error: { file: '' } })
      return h.redirect('/animals/add/your-details')
    }

    // decision/holding page waiting for virus scan and s3 upload
    return h.view('animals/views/uploaded', {
      pageTitle: 'Uploaded',
      animalSession
    })
  }
}

export { uploadedController }
