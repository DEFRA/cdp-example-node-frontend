import { sessionNames } from '~/src/server/common/constants/session-names'
import { fetchStatus } from '~/src/server/common/helpers/upload/fetch-status'
import { provideAnimalSession } from '~/src/server/animals/helpers/pre/provide-animal-session'
import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'

const statusPollerController = {
  options: {
    pre: [provideAnimalSession]
  },
  handler: async (request, h) => {
    const animalSession = request.pre.animalSession

    const uploadId = animalSession?.secureUpload?.uploadId
    const status = await fetchStatus(uploadId)

    const isReady = status?.uploadStatus === 'ready'
    const hasPassedVirusCheck = status?.numberOfInfectedFiles === 0

    // TODO: can this be better?
    const hasUploadedFile = status?.fields?.file

    // No file uploaded - Return to upload form with errors
    if (!hasUploadedFile) {
      request.yar.flash(sessionNames.validationFailure, {
        formErrors: { file: { message: 'Choose a file' } }
      })

      return h.redirect('/animals/add/upload-picture')
    }

    // Virus check failed - Return to upload form with errors
    if (isReady) {
      const fileStatus = status.files.find(
        (f) => f.fileId === status.fields.file.fileId
      )

      if (fileStatus === 'infected') {
        request.yar.flash(sessionNames.validationFailure, {
          formErrors: { file: { message: 'Virus check failed' } }
        })

        return h.redirect('/animals/add/upload-picture')
      }

      // TODO: save the file info to the session
      await saveToAnimal(request, h, {
        fileUrl: fileStatus.uploadId + '/' + fileStatus.fileId
      })
      return h.redirect('/animals/add/your-details')
    }

    // Move to next step in the multi-step form
    if (isReady && hasPassedVirusCheck) {
      return h.redirect('/animals/add/your-details')
    }

    // decision/holding page waiting for virus scan and s3 upload
    return h.view('animals/views/status-poller', {
      pageTitle: 'Virus check',
      heading: 'Scanning your files',
      breadcrumbs: [
        {
          text: 'Animals',
          href: '/animals'
        },
        {
          text: 'Details',
          href: '/animals/add/details'
        },
        {
          text: 'Kind',
          href: '/animals/add/kind'
        },
        {
          text: 'Upload picture'
        }
      ]
    })
  }
}

export { statusPollerController }
