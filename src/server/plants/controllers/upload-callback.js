import Joi from 'joi'

import { sessionNames } from '~/src/server/common/constants/session-names'
import { providePlantSession } from '~/src/server/plants/helpers/pre/provide-plant-session'
import { saveToPlant } from '~/src/server/plants/helpers/form/save-to-plant'
import { providePlantStatus } from '~/src/server/plants/helpers/pre/provide-plant-status'

const uploadCallbackController = {
  options: {
    pre: [providePlantSession, providePlantStatus],
    validate: {
      query: Joi.object({
        uploadId: Joi.string().guid().required()
      })
    }
  },
  handler: async (request, h) => {
    const status = request.pre.plantStatus
    const hasUploadedFile = status?.files?.length > 0

    // No file uploaded - Return to upload form with error
    if (!hasUploadedFile) {
      request.yar.flash(sessionNames.validationFailure, {
        formErrors: { file: { message: 'Choose a file' } }
      })

      return h.redirect('/plants/add/upload-pictures')
    }

    const uploadedFileInfo = status?.files?.at(0)

    const plantSession = request.pre.plantSession
    const files = plantSession?.files ?? []

    if (uploadedFileInfo) {
      // TODO add more info?
      await saveToPlant(request, h, {
        files: [
          ...files,
          {
            filename: uploadedFileInfo?.filename,
            uploadId: uploadedFileInfo?.uploadId,
            fileId: uploadedFileInfo?.fileId
          }
        ]
      })
    }

    return h.redirect('/plants/add/upload-pictures')
  }
}

export { uploadCallbackController }
