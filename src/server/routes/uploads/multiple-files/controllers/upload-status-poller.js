import { sessionNames } from '#/server/common/constants/session-names.js'
import { buildErrorDetails } from '#/server/common/helpers/build-error-details.js'
import { noSessionRedirect } from '../helpers/ext/no-session-redirect.js'
import { provideUploadStatusFromSession } from '#/server/routes/uploads/common/helpers/provide-upload-status.js'
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
    const crumb = request.plugins.crumb

    // Success
    if (hasBeenVirusChecked) {
      const validationResult = uploadFormValidation(crumb).validate(
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
        return h.redirect(`/uploads/multiple-files/${creatureId}/upload`)
      }

      request.yar.set(creatureId, {
        fields: uploadStatus.form
      })

      request.logger.info('upload complete, redirecting to summary')
      return h.redirect(`/uploads/multiple-files/${creatureId}/summary`)
    }

    // Virus check polling page
    return h.view('uploads/multiple-files/views/upload-status-poller', {
      pageTitle: 'Virus check',
      heading: 'Scanning your files',
      status: JSON.stringify(uploadStatus, null, 2),
      breadcrumbs: [
        {
          text: 'File uploads',
          href: '/uploads'
        },
        {
          text: 'Multiple files',
          href: '/uploads/multiple-files'
        },
        {
          text: 'Add creature sighting',
          href: `/uploads/multiple-files/${creatureId}/upload`
        },
        {
          text: 'Upload creature sighting'
        }
      ]
    })
  }
}

export { uploadStatusPollerController }
