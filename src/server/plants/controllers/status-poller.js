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

    // Errors from cdp-uploader
    if (fileInputHasError) {
      setError(fileInputStatus.errorMessage)

      return h.redirect('/plants/add/upload-pictures')
    }

    // No file uploaded
    if (!hasUploadedFile) {
      setError('The selected file is empty')

      return h.redirect('/plants/add/upload-pictures')
    }

    // Mime type mismatch
    if (!hasCorrectMimeType) {
      setError(
        `${acceptedMimeTypes
          .map((mimeType) => '.' + mimeType.split('/')[1])
          .join(', ')} files only`
      )

      return h.redirect('/plants/add/upload-pictures')
    }

    // Filesize limit exceeded
    if (fileSizeLimitExceeded) {
      setError(`Max file size of ${maxFileSize}`)

      return h.redirect('/plants/add/upload-pictures')
    }

    // File is ready to be used
    if (hasBeenVirusChecked && !hasRejectedFiles) {
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
