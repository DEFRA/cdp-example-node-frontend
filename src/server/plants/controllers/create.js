import { sessionNames } from '~/src/server/common/constants/session-names'
import { createPlant } from '~/src/server/plants/helpers/fetch/create-plant'
import { providePlantSession } from '~/src/server/plants/helpers/pre/provide-plant-session'

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
