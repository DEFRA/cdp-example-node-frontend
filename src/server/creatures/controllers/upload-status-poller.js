import { sessionNames } from '../../common/constants/session-names.js'
import { buildErrorDetails } from '../../common/helpers/build-error-details.js'
import { noSessionRedirect } from '../helpers/ext/no-session-redirect.js'
import { provideUploadStatusFromSession } from '../../common/helpers/pre/provide-upload-status.js'
import { uploadFormValidation } from '../helpers/schemas/upload-form-validation.js'

const uploadStatusPollerController = {
  options: {
    ext: {
      onPreHandler: [noSessionRedirect]
    },
    pre: [provideUploadStatusFromSession(sessionNames.creatures)]
  },
  handler: async (request, h) => {
    const creatureId = request.params.creatureId
    const uploadStatus = request.pre.uploadStatus
    const hasBeenVirusChecked = uploadStatus?.uploadStatus === 'ready'

    // uses the crumb key to find the right cookie
    const csrfToken = request.plugins.crumb

    // Success
    if (hasBeenVirusChecked) {
      const validationResult = uploadFormValidation(csrfToken).validate(
        uploadStatus.form,
        {
          abortEarly: false
        }
      )

      if (validationResult?.error) {
        request.logger.error(validationResult?.error)
        const errorDetails = buildErrorDetails(validationResult?.error?.details)

        request.yar.flash(sessionNames.validationFailure, {
          formValues: uploadStatus.form,
          formErrors: errorDetails
        })

        request.logger.info('redirecting back to upload form')
        return h.redirect(`/creatures/${creatureId}/upload`)
      }

      request.yar.set(creatureId, {
        fields: uploadStatus.form
      })

      request.logger.info('upload complete, redirecting to summary')
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
