import { provideAnimalSession } from '~/src/server/animals/helpers/pre/provide-animal-session'
import { fetchStatus } from '~/src/server/common/helpers/upload/fetch-status'
import { sessionNames } from '~/src/server/common/constants/session-names'

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

    // No file uploaded - Return to upload form with errors
    if (!hasUploadedFile) {
      request.yar.flash(sessionNames.validationFailure, {
        formErrors: { file: { message: 'Choose a file' } }
      })

      return h.redirect('/animals/add/upload-picture')
    }

    // Virus check failed - Return to upload form with errors
    if (hasPassedVirusCheck === false) {
      request.yar.flash(sessionNames.validationFailure, {
        formErrors: { file: { message: 'Virus check failed' } }
      })

      return h.redirect('/animals/add/upload-picture')
    }

    // Move to next step in the multi-step form
    if (hasPassedVirusCheck && delivered && fileUrl) {
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
