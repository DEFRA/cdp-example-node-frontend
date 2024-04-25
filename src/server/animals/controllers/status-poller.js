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
    const acceptedMimeTypes = status.acceptedMimeTypes
    const hasUploadedFile = status?.files.length > 0
    const hasBeenVirusChecked = status?.uploadStatus === 'ready'
    const hasPassedVirusCheck = status?.numberOfInfectedFiles === 0
    const fileUploadSizeMb = fileUpload?.contentLength / 1024
    const fileSizeLimitExceeded = fileUploadSizeMb > status?.maxFileSize
    const hasCorrectMimeType = acceptedMimeTypes.includes(
      fileUpload?.contentType
    )

    // No file uploaded
    if (!hasUploadedFile) {
      setError('Choose a file')

      return h.redirect('/animals/add/upload-picture')
    }

    // Mime type mismatch
    if (!hasCorrectMimeType) {
      setError(`Files of ${acceptedMimeTypes.join(', ')}`)

      return h.redirect('/animals/add/upload-picture')
    }

    // Filesize limit exceeded
    if (fileSizeLimitExceeded) {
      setError(`Max file size of ${status?.maxFileSize}`)

      return h.redirect('/animals/add/upload-picture')
    }

    // Virus check failed
    if (hasBeenVirusChecked && !hasPassedVirusCheck) {
      setError('Virus check failed')

      return h.redirect('/animals/add/upload-picture')
    }

    // File has successfully passed virus check and is ready to be used/stored in session/db
    if (hasBeenVirusChecked && hasPassedVirusCheck) {
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
