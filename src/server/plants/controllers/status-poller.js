import Joi from 'joi'

import { saveToPlant } from '~/src/server/plants/helpers/form/save-to-plant'
import { provideStatus } from '~/src/server/common/helpers/pre/provide-status'
import { providePlantSession } from '~/src/server/plants/helpers/pre/provide-plant-session'
import { populateErrorFlashMessage } from '~/src/server/common/helpers/form/populate-error-flash-message'

const statusPollerController = {
  options: {
    pre: [providePlantSession, provideStatus],
    validate: {
      query: Joi.object({
        uploadId: Joi.string().guid().required()
      })
    }
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

      return h.redirect('/plants/add/upload-pictures')
    }

    // Mime type mismatch
    if (!hasCorrectMimeType) {
      setError(`Files of ${acceptedMimeTypes.join(', ')}`)

      return h.redirect('/plants/add/upload-pictures')
    }

    // Filesize limit exceeded
    if (fileSizeLimitExceeded) {
      setError(`Max file size of ${status?.maxFileSize}`)

      return h.redirect('/plants/add/upload-pictures')
    }

    // Virus check failed
    if (hasBeenVirusChecked && !hasPassedVirusCheck) {
      setError('Virus check failed')

      return h.redirect('/plants/add/upload-pictures')
    }

    // File has successfully passed virus check and is ready to be used/stored in session/db
    if (hasBeenVirusChecked && hasPassedVirusCheck) {
      const previouslyUploadFiles = request.pre.plantSession?.files ?? []
      const fileUpload = status?.files?.at(0)

      await saveToPlant(request, h, {
        files: [
          ...previouslyUploadFiles,
          {
            filename: fileUpload.filename,
            uploadId: fileUpload.uploadId,
            fileId: fileUpload.fileId,
            fileUrl: fileUpload.uploadId + '/' + fileUpload.fileId
          }
        ]
      })

      return h.redirect('/plants/add/upload-pictures')
    }

    // Virus check polling page
    return h.view('plants/views/status-poller', {
      pageTitle: 'Virus check',
      heading: 'Scanning your file',
      breadcrumbs: [
        {
          text: 'Plants',
          href: '/plants'
        },
        {
          text: 'Details',
          href: '/plants/add/details'
        },
        {
          text: 'Upload pictures'
        }
      ]
    })
  }
}

export { statusPollerController }
