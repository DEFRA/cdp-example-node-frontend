import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'
import { provideUploadStatusFromSession } from '~/src/server/common/helpers/pre/provide-upload-status'
import { populateErrorFlashMessage } from '~/src/server/common/helpers/form/populate-error-flash-message'
import { sessionNames } from '~/src/server/common/constants/session-names'

const uploadStatusPollerController = {
  options: {
    pre: [provideUploadStatusFromSession(sessionNames.animals)]
  },
  handler: async (request, h) => {
    const setError = populateErrorFlashMessage(request)
    const uploadStatus = request.pre.uploadStatus
    const hasBeenVirusChecked = uploadStatus?.uploadStatus === 'ready'

    // File is ready to be used
    if (hasBeenVirusChecked) {
      const fileInputStatus = uploadStatus?.form?.file
      const fileInputHasError = fileInputStatus?.hasError

      if (fileInputStatus && fileInputHasError) {
        setError(fileInputStatus.errorMessage)
        return h.redirect('/animals/add/upload-picture')
      }

      const file = uploadStatus?.form?.file
      await saveToAnimal(request, h, {
        file: {
          filename: file.filename,
          fileUrl: file.s3Key
        }
      })

      // Move to next step in the multistep form
      return h.redirect('/animals/add/your-details')
    }

    // Virus check polling page
    return h.view('animals/views/upload-status-poller', {
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

export { uploadStatusPollerController }
