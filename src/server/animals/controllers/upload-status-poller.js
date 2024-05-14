import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'
import { provideUploadStatus } from '~/src/server/common/helpers/pre/provide-upload-status'
import { populateErrorFlashMessage } from '~/src/server/common/helpers/form/populate-error-flash-message'

const uploadStatusPollerController = {
  options: {
    pre: [provideUploadStatus]
  },
  handler: async (request, h) => {
    const setError = populateErrorFlashMessage(request)
    const uploadStatus = request.pre.uploadStatus
    const fileUpload = uploadStatus.files.at(0)
    const hasBeenVirusChecked = uploadStatus?.uploadStatus === 'ready'
    const fileInputStatus = uploadStatus?.fields?.file
    const fileInputHasError = fileInputStatus?.hasError

    // Errors from cdp-uploader
    if (fileInputHasError) {
      setError(fileInputStatus.errorMessage)

      return h.redirect('/animals/add/upload-picture')
    }

    // File is ready to be used
    if (hasBeenVirusChecked) {
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
