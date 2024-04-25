import { sessionNames } from '~/src/server/common/constants/session-names'
import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'
import { provideStatus } from '~/src/server/common/helpers/pre/provide-status'

const statusPollerController = {
  options: {
    pre: [provideStatus]
  },
  handler: async (request, h) => {
    // TODO look into custom Joi validator
    const status = request.pre.status
    const hasUploadedFile = status?.files.length > 0

    // No file uploaded - Return to upload form with errors
    if (!hasUploadedFile) {
      request.yar.flash(sessionNames.validationFailure, {
        formErrors: { file: { message: 'Choose a file' } }
      })

      return h.redirect('/animals/add/upload-picture')
    }

    const hasBeenVirusChecked = status?.uploadStatus === 'ready'
    const hasPassedVirusCheck = status?.numberOfInfectedFiles === 0

    // Virus check failed - Return to upload form with errors
    if (hasBeenVirusChecked && !hasPassedVirusCheck) {
      request.yar.flash(sessionNames.validationFailure, {
        formErrors: { file: { message: 'Virus check failed' } }
      })

      return h.redirect('/animals/add/upload-picture')
    }

    // File has successfully passed virus check and is ready to be used/stored in session/db
    if (hasBeenVirusChecked && hasPassedVirusCheck) {
      const fileUpload = status.files.at(0)

      await saveToAnimal(request, h, {
        file: {
          filename: fileUpload.filename,
          uploadId: fileUpload.uploadId,
          fileId: fileUpload.fileId,
          fileUrl: fileUpload.uploadId + '/' + fileUpload.fileId
        }
      })

      // Move to next step in the multistep form
      return h.redirect('/animals/add/your-details')
    }

    // Virus check polling page
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
