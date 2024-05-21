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
    const hasBeenVirusChecked = uploadStatus?.uploadStatus === 'ready'
    const fileUpload = uploadStatus?.form?.file

    const csrfToken = request.plugins.crumb

    if (
      !uploadStatus?.form?.csrfToken ||
      csrfToken !== uploadStatus.form.csrfToken
    ) {
      setError('CSRF Token failed validation')
      return h.redirect('/plants/add/upload-pictures')
    }

    // File is ready to be used
    if (hasBeenVirusChecked) {
      // Errors from cdp-uploader
      if (fileUpload && fileUpload?.hasError) {
        setError(fileUpload.errorMessage)
        return h.redirect('/plants/add/upload-pictures')
      }

      const previouslyUploadFiles = request.pre.plantSession?.files ?? []

      await saveToPlant(request, h, {
        files: [
          ...previouslyUploadFiles,
          {
            filename: fileUpload.filename,
            fileUrl: fileUpload.s3Key
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
