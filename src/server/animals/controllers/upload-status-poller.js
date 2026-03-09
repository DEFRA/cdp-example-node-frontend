import { saveToAnimal } from '../helpers/form/save-to-animal.js'
import { provideUploadStatusFromSession } from '../../common/helpers/pre/provide-upload-status.js'
import { populateErrorFlashMessage } from '../../common/helpers/form/populate-error-flash-message.js'
import { sessionNames } from '../../common/constants/session-names.js'

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
