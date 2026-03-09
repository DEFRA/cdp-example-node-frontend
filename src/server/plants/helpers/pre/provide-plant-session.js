import { sessionNames } from '../../../common/constants/session-names.js'

const providePlantSession = {
  method: async (request, h) => await request.yar.get(sessionNames.plants),
  assign: 'plantSession'
}

export { providePlantSession }
