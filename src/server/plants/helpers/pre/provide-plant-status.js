import { fetchStatus } from '~/src/server/common/helpers/upload/fetch-status'

const providePlantStatus = {
  method: async (request) => await fetchStatus(request.query.uploadId),
  assign: 'plantStatus'
}

export { providePlantStatus }
