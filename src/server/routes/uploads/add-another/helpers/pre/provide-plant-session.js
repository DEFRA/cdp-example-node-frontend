import { sessionNames } from '#/server/common/constants/session-names.js'

const providePlantSession = {
  method: (request, h) => request.yar.get(sessionNames.plants),
  assign: 'plantSession'
}

export { providePlantSession }
