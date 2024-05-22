import { fetchStatus } from '~/src/server/common/helpers/upload/fetch-status'
import Boom from '@hapi/boom'

const provideUploadStatus = {
  method: async (request) => {
    request.logger.debug({ uploadId: request.query.uploadId }, 'Upload ID:')
    return await fetchStatus(request.query.uploadId)
  },
  assign: 'uploadStatus'
}

/*
 * Get the upload status from a given session.
 * Expects the session to have a key named 'statusUrl' containing a full status url.
 */
const provideUploadStatusFromSession = (sessionId) => {
  return {
    method: async (request) => {
      const session = request.yar.get(sessionId)
      if (session.statusUrl) {
        const response = await fetch(session.statusUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        return await response.json()
      }
      throw Boom.badRequest('No status url found')
    },
    assign: 'uploadStatus'
  }
}

export { provideUploadStatus, provideUploadStatusFromSession }
