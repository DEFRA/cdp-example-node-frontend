import { sessionNames } from '~/src/server/common/constants/session-names'
import { buildErrorDetails } from '~/src/server/common/helpers/build-error-details'
import { noSessionRedirect } from '~/src/server/creatures/helpers/ext/no-session-redirect'
import { provideUploadStatus } from '~/src/server/common/helpers/pre/provide-upload-status'
import { uploadFormValidation } from '~/src/server/creatures/helpers/schemas/upload-form-validation'

const uploadStatusPollerController = {
  options: {
    ext: {
      onPreHandler: [noSessionRedirect]
    },
    pre: [provideUploadStatus]
  },
  handler: async (request, h) => {
    const creatureId = request.params.creatureId
    const uploadStatus = request.pre.uploadStatus
    const hasBeenVirusChecked = uploadStatus?.uploadStatus === 'ready'

    // Success
    if (hasBeenVirusChecked) {
      const validationResult = uploadFormValidation.validate(
        uploadStatus.fields,
        {
          abortEarly: false
        }
      )

      if (validationResult?.error) {
        const errorDetails = buildErrorDetails(validationResult?.error?.details)

        request.yar.flash(sessionNames.validationFailure, {
          formValues: uploadStatus.fields,
          formErrors: errorDetails
        })

        return h.redirect(`/creatures/${creatureId}/upload`)
      }

      await request.redis.storeData(creatureId, {
        fields: uploadStatus.fields
      })

      return h.redirect(`/creatures/${creatureId}/summary`)
    }

    // Virus check polling page
    return h.view('creatures/views/upload-status-poller', {
      pageTitle: 'Virus check',
      heading: 'Scanning your files',
      breadcrumbs: [
        {
          text: 'Creatures',
          href: '/creatures'
        },
        {
          text: 'Add creature sighting',
          href: `/creatures/${creatureId}/upload`
        },
        {
          text: 'Upload creature sighting'
        }
      ]
    })
  }
}

export { uploadStatusPollerController }
