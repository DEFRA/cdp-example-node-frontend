import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'
import { provideStatus } from '~/src/server/common/helpers/pre/provide-status'
import { populateErrorFlashMessage } from '~/src/server/common/helpers/form/populate-error-flash-message'

const statusPollerController = {
  options: {
    pre: [provideStatus]
  },
  handler: async (request, h) => {
    const setError = populateErrorFlashMessage(request)
    const status = request.pre.status
    const fileUpload = status.files.at(0)
    const acceptedMimeTypes = ['image/png', 'image/jpeg']
    const maxFileSize = 100
    const hasUploadedFile = status?.files.length > 0
    const hasBeenVirusChecked = status?.uploadStatus === 'ready'
    const hasRejectedFiles = status?.numberOfRejectedFiles > 0
    const fileUploadSizeMb = fileUpload?.contentLength / 1024 / 1024
    const fileSizeLimitExceeded = fileUploadSizeMb > maxFileSize
    const fileInputStatus = status?.fields?.file
    const fileInputHasError = fileInputStatus?.hasError
    const hasCorrectMimeType = acceptedMimeTypes.includes(
      fileUpload?.contentType
    )

    // No file uploaded
    if (!hasUploadedFile) {
      setError('The selected file is empty')

      return h.redirect('/animals/add/upload-picture')
    }

    // Errors from cdp-uploader
    if (fileInputHasError) {
      setError(fileInputStatus.errorMessage)

      return h.redirect('/animals/add/upload-picture')
    }

    // Mime type mismatch
    if (!hasCorrectMimeType) {
      setError(
        `${acceptedMimeTypes
          .map((mimeType) => '.' + mimeType.split('/')[1])
          .join(', ')} files only`
      )

      return h.redirect('/animals/add/upload-picture')
    }

    // Filesize limit exceeded
    if (fileSizeLimitExceeded) {
      setError(`Max file size of ${maxFileSize}`)

      return h.redirect('/animals/add/upload-picture')
    }

    // File is ready to be used
    if (hasBeenVirusChecked && !hasRejectedFiles) {
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
