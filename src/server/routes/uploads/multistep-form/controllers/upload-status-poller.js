import { saveToAnimal } from '../helpers/form/save-to-animal.js'
import { provideUploadStatusFromSession } from '#/server/routes/uploads/common/helpers/provide-upload-status.js'
import { populateErrorFlashMessage } from '#/server/common/helpers/form/populate-error-flash-message.js'
import { sessionNames } from '#/server/common/constants/session-names.js'

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
        return h.redirect('/uploads/multistep-form/add/upload-picture')
      }

      const file = uploadStatus?.form?.file
      await saveToAnimal(request, h, {
        file: {
          filename: file.filename,
          fileUrl: file.s3Key
        }
      })

      // Move to next step in the multistep form
      return h.redirect('/uploads/multistep-form/add/your-details')
    }

    // Virus check polling page
    return h.view('uploads/multistep-form/views/upload-status-poller', {
      pageTitle: 'Virus check',
      heading: 'Scanning your files',
      status: JSON.stringify(uploadStatus, null, 2),
      breadcrumbs: [
        {
          text: 'File uploads',
          href: '/uploads'
        },
        {
          text: 'In a multistep form',
          href: '/uploads/multistep-form'
        },
        {
          text: 'Details',
          href: '/uploads/multistep-form/add/details'
        },
        {
          text: 'Kind',
          href: '/uploads/multistep-form/add/kind'
        },
        {
          text: 'Upload picture'
        }
      ]
    })
  }
}

export { uploadStatusPollerController }
