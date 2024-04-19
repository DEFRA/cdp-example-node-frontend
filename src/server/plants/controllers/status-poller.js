import { sessionNames } from '~/src/server/common/constants/session-names'
import { fetchStatus } from '~/src/server/common/helpers/upload/fetch-status'
import { providePlantSession } from '~/src/server/plants/helpers/pre/provide-plant-session'
import { saveToPlant } from '~/src/server/plants/helpers/form/save-to-plant'

const statusPollerController = {
  options: {
    pre: [providePlantSession]
  },
  handler: async (request, h) => {
    const plantSession = request.pre.plantSession

    const uploadId = plantSession?.secureUpload?.uploadId
    const status = await fetchStatus(uploadId)

    const isReady =
      status?.uploadStatus === 'ready' ||
      status?.uploadStatus === 'acknowledged'
    const hasPassedVirusCheck = status?.numberOfInfectedFiles === 0

    // TODO: can this be better?
    const hasUploadedFile = status?.files.length > 0

    // No file uploaded - Return to upload form with errors
    if (!hasUploadedFile) {
      request.yar.flash(sessionNames.validationFailure, {
        formErrors: { file: { message: 'Choose a file' } }
      })

      return h.redirect('/plants/add/upload-picture')
    }

    // Virus check failed - Return to upload form with errors
    if (isReady && !hasPassedVirusCheck) {
      request.yar.flash(sessionNames.validationFailure, {
        formErrors: { file: { message: 'Virus check failed' } }
      })

      return h.redirect('/plants/add/upload-picture')
    }

    // Move to next step in the multi-step form
    if (isReady && hasPassedVirusCheck) {
      // TODO: save the file info to the session
      await saveToPlant(request, h, {
        fileUrl: status.files.at(0)?.s3Key
      })
      return h.redirect('/plants/add/summary')
    }

    // decision/holding page waiting for virus scan and s3 upload
    return h.view('animals/views/status-poller', {
      pageTitle: 'Virus check',
      heading: 'Scanning your files',
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
          text: 'Kind',
          href: '/plants/add/kind'
        },
        {
          text: 'Upload picture'
        }
      ]
    })
  }
}

export { statusPollerController }
