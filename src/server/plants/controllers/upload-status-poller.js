import Joi from 'joi'

import { saveToPlant } from '~/src/server/plants/helpers/form/save-to-plant'
import { providePlantSession } from '~/src/server/plants/helpers/pre/provide-plant-session'
import { provideUploadStatus } from '~/src/server/common/helpers/pre/provide-upload-status'
import { populateErrorFlashMessage } from '~/src/server/common/helpers/form/populate-error-flash-message'

const uploadStatusPollerController = {
  options: {
    pre: [providePlantSession, provideUploadStatus],
    validate: {
      query: Joi.object({
        uploadId: Joi.string().guid().required()
      })
    }
  },
  handler: async (request, h) => {
    const setError = populateErrorFlashMessage(request)
    const uploadStatus = request.pre.uploadStatus
    const fileUpload = uploadStatus.files.at(0)
    const acceptedMimeTypes = ['image/png', 'image/jpeg']
    const maxFileSize = 100
    const hasUploadedFile = uploadStatus?.fields?.file?.contentLength > 0
    const hasBeenVirusChecked = uploadStatus?.uploadStatus === 'ready'
    const hasRejectedFiles = uploadStatus?.numberOfRejectedFiles > 0
    const fileUploadSizeMb = fileUpload?.contentLength / 1024 / 1024
    const fileSizeLimitExceeded = fileUploadSizeMb > maxFileSize
    const fileInputStatus = uploadStatus?.fields?.file
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
      const fileUpload = uploadStatus?.files?.at(0)

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
    return h.view('plants/views/upload-status-poller', {
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

export { uploadStatusPollerController }
