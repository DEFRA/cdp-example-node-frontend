import { sessionNames } from '~/src/server/common/constants/session-names'
import { fetchStatus } from '~/src/server/common/helpers/upload/fetch-status'
import { createCreature } from '~/src/server/creatures/helpers/fetch/create-creature'
import { uploadFormValidation } from '~/src/server/creatures/helpers/schemas/upload-form-validation'
import { buildErrorDetails } from '~/src/server/common/helpers/build-error-details'

const statusPollerController = {
  handler: async (request, h) => {
    const uploadId = request.query.uploadId
    const creatureId = request.params.creatureId

    const storedUploadId = await request.redis.findCreatureId(creatureId)
    if (!storedUploadId) {
      // todo add logic to show errors
      request.logger.info('No creatureId found')
      return h.redirect('/creatures/upload')
    }

    const upload = await fetchStatus(uploadId)

    const validationResult = uploadFormValidation.validate(upload.fields, {
      abortEarly: false
    })
    if (validationResult?.error) {
      const errorDetails = buildErrorDetails(validationResult.error.details)

      request.yar.flash(sessionNames.validationFailure, {
        formValues: upload.fields,
        formErrors: errorDetails
      })
      request.logger.info(
        validationResult,
        `Validation Errors: ${errorDetails}`
      )
      return h.redirect('/creatures/upload')
    }

    const creatureFiles = upload.fields.creatureFiles
    const missingCreatureFile =
      !Array.isArray(creatureFiles) && creatureFiles.contentLength === 0

    if (missingCreatureFile) {
      request.yar.flash(sessionNames.validationFailure, {
        formValues: upload.fields,
        formErrors: { creatureFiles: { message: 'Choose a file' } }
      })
      request.logger.info('No creature files')
      return h.redirect('/creatures/upload')
    }

    const evidenceFiles = upload.fields.evidenceFiles
    const missingEvidenceFile =
      !Array.isArray(evidenceFiles) && evidenceFiles.contentLength === 0

    if (missingEvidenceFile) {
      request.yar.flash(sessionNames.validationFailure, {
        formValues: upload.fields,
        formErrors: { evidenceFiles: { message: 'Choose a file' } }
      })
      request.logger.info('No evidence files')
      return h.redirect('/creatures/upload')
    }

    // Virus check failed - Return to upload form with errors
    const isReady = upload?.uploadStatus === 'ready'
    const uploadSuccessful = upload?.numberOfRejectedFiles === 0

    if (isReady && !uploadSuccessful) {
      request.yar.flash(sessionNames.validationFailure, {
        // todo add logic to show file errors
        formValues: upload.fields,
        formErrors: {
          ...(isRejected(creatureFiles, request) && {
            creatureFiles: { message: 'Virus check failed' }
          }),
          ...(isRejected(evidenceFiles, request) && {
            evidenceFiles: { message: 'Virus check failed' }
          })
        }
      })
      request.logger.info('Virus check failed')
      return h.redirect('/creatures/upload')
    }

    if (isReady && uploadSuccessful) {
      await createCreature(creatureId, upload.fields)
      return h.redirect(`/creatures/${creatureId}`)
    }

    // decision/holding page waiting for virus scan and s3 upload
    return h.view('animals/views/status-poller', {
      pageTitle: 'Virus check',
      heading: 'Scanning your files',
      breadcrumbs: [
        {
          text: 'Creatures',
          href: '/creatures'
        },
        {
          text: 'Add creature sighting',
          href: '/creatures/upload'
        },
        {
          text: 'Upload creature sighting'
        }
      ]
    })
  }
}

function isRejected(fileField, request) {
  const files = Array.isArray(fileField) ? fileField : [fileField]
  request.logger.info(files, 'files')
  return files.some((f) => f.fileStatus === 'rejected')
}

export { statusPollerController }
