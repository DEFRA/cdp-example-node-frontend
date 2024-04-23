import { sessionNames } from '~/src/server/common/constants/session-names'

const providePlantSession = {
  method: async (request, h) => await request.yar.get(sessionNames.plants),
  assign: 'plantSession'
}

export { providePlantSession }
