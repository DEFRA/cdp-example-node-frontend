import { sessionNames } from '../../common/constants/session-names.js'
import { createPlant } from '../helpers/fetch/create-plant.js'
import { providePlantSession } from '../helpers/pre/provide-plant-session.js'

const createController = {
  options: {
    pre: [providePlantSession]
  },
  handler: async (request, h) => {
    const plantSession = request.pre.plantSession

    const json = await createPlant(plantSession)
    const name = json?.plant?.name

    request.yar.clear(sessionNames.plants)
    request.yar.flash(sessionNames.notifications, {
      text: `Plant ${name} added`,
      type: 'success'
    })

    return h.redirect('/plants')
  }
}

export { createController }
