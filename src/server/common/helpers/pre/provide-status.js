import { fetchStatus } from '~/src/server/common/helpers/upload/fetch-status'

const provideStatus = {
  method: async (request) => {
    request.logger.debug({ uploadId: request.query.uploadId }, `Upload ID:`)
    return await fetchStatus(request.query.uploadId)
  },
  assign: 'status'
}

export { provideStatus }
