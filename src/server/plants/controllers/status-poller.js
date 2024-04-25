import Joi from 'joi'

import { sessionNames } from '~/src/server/common/constants/session-names'
import { saveToPlant } from '~/src/server/plants/helpers/form/save-to-plant'
import { provideStatus } from '~/src/server/common/helpers/pre/provide-status'
import { providePlantSession } from '~/src/server/plants/helpers/pre/provide-plant-session'

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
    const status = request.pre.status
    const hasUploadedFile = status?.files?.length > 0

    // No file uploaded - Return to upload form with error
    if (!hasUploadedFile) {
      request.yar.flash(sessionNames.validationFailure, {
        formErrors: { file: { message: 'Choose a file' } }
      })

      return h.redirect('/plants/add/upload-pictures')
    }

    const hasBeenVirusChecked = status?.uploadStatus === 'ready'
    const hasPassedVirusCheck = status?.numberOfInfectedFiles === 0

    // Virus check failed - Return to upload form with errors
    if (hasBeenVirusChecked && !hasPassedVirusCheck) {
      request.yar.flash(sessionNames.validationFailure, {
        formErrors: { file: { message: 'Virus check failed' } }
      })

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
