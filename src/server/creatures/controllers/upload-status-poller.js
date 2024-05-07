import { sessionNames } from '~/src/server/common/constants/session-names'
import { buildErrorDetails } from '~/src/server/common/helpers/build-error-details'
import { hasUploadedFile } from '~/src/server/creatures/helpers/has-uploaded-file'
import { noSessionRedirect } from '~/src/server/creatures/helpers/ext/no-session-redirect'
import { provideUploadStatus } from '~/src/server/common/helpers/pre/provide-upload-status'
import { getFileRejectionMessage } from '~/src/server/creatures/helpers/get-file-rejection-message'
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
    const hasRejectedFiles = uploadStatus?.numberOfRejectedFiles > 0
    const hasUploadedCreatureFiles = hasUploadedFile(
      uploadStatus?.fields?.creatureFiles
    )
    const hasUploadedEvidenceFiles = hasUploadedFile(
      uploadStatus?.fields?.evidenceFiles
    )

    const validationResult = uploadFormValidation.validate(
      uploadStatus.fields,
      {
        abortEarly: false
      }
    )

    if (
      validationResult?.error ||
      !hasUploadedCreatureFiles ||
      !hasUploadedEvidenceFiles
    ) {
      const errorDetails = buildErrorDetails(validationResult?.error?.details)

      // TODO abstract this
      request.yar.flash(sessionNames.validationFailure, {
        formValues: uploadStatus.fields,
        formErrors: {
          ...errorDetails,
          ...(!hasUploadedCreatureFiles && {
            creatureFiles: { message: 'Choose a file' }
          }),
          ...(!hasUploadedEvidenceFiles && {
            evidenceFiles: { message: 'Choose a file' }
          })
        }
      })

      return h.redirect(`/creatures/${creatureId}/upload`)
    }

    // Errors from cdp-uploader
    if (hasRejectedFiles) {
      const creatureFilesErrorMessage = getFileRejectionMessage(
        uploadStatus.fields.creatureFiles
      )
      const evidenceFilesErrorMessage = getFileRejectionMessage(
        uploadStatus.fields.evidenceFiles
      )

      // TODO abstract this
      request.yar.flash(sessionNames.validationFailure, {
        formValues: uploadStatus.fields,
        formErrors: {
          ...(creatureFilesErrorMessage && {
            creatureFiles: { message: creatureFilesErrorMessage }
          }),
          ...(evidenceFilesErrorMessage && {
            evidenceFiles: { message: evidenceFilesErrorMessage }
          })
        }
      })

      return h.redirect(`/creatures/${creatureId}/upload`)
    }

    // Success
    if (hasBeenVirusChecked && !hasRejectedFiles) {
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
