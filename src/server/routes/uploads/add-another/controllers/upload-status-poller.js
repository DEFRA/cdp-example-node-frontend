import { saveToPlant } from '../helpers/form/save-to-plant.js'
import { providePlantSession } from '../helpers/pre/provide-plant-session.js'
import { provideUploadStatusFromSession } from '#/server/routes/uploads/common/helpers/provide-upload-status.js'
import { populateErrorFlashMessage } from '#/server/common/helpers/form/populate-error-flash-message.js'
import { sessionNames } from '#/server/common/constants/session-names.js'

const uploadStatusPollerController = {
  options: {
    pre: [
      providePlantSession,
      provideUploadStatusFromSession(sessionNames.plants)
    ]
  },
  handler: async (request, h) => {
    const setError = populateErrorFlashMessage(request)
    const uploadStatus = request.pre.uploadStatus
    const hasBeenVirusChecked = uploadStatus?.uploadStatus === 'ready'

    const crumb = request.plugins.crumb

    if (!uploadStatus?.form?.crumb || crumb !== uploadStatus.form.crumb) {
      setError('CSRF Token failed validation')
      return h.redirect('/uploads/add-another/add/upload-pictures')
    }

    // File is ready to be used
    if (hasBeenVirusChecked) {
      const fileUpload = uploadStatus?.form?.file
      // Errors from cdp-uploader
      if (fileUpload && fileUpload?.hasError) {
        setError(fileUpload.errorMessage)
        return h.redirect('/uploads/add-another/add/upload-pictures')
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

      return h.redirect('/uploads/add-another/add/upload-pictures')
    }

    // Virus check polling page
    return h.view('uploads/add-another/views/upload-status-poller', {
      pageTitle: 'Virus check',
      heading: 'Scanning your file',
      status: JSON.stringify(uploadStatus, null, 2),
      breadcrumbs: [
        {
          text: 'File uploads',
          href: '/uploads'
        },
        {
          text: 'Add another file',
          href: '/uploads/add-another'
        },
        {
          text: 'Details',
          href: '/uploads/add-another/add/details'
        },
        {
          text: 'Upload pictures'
        }
      ]
    })
  }
}

export { uploadStatusPollerController }
