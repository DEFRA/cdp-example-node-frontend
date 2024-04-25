import { fetchStatus } from '~/src/server/common/helpers/upload/fetch-status'

const providePlantStatus = {
  method: async (request) => {
    request.logger.debug({ uploadId: request.query.uploadId }, `Upload ID:`)
    return await fetchStatus(request.query.uploadId)
  },
  assign: 'plantStatus'
}

export { providePlantStatus }
