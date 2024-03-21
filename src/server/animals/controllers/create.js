import { sessionNames } from '~/src/server/common/constants/session-names'
import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'

const createController = {
  handler: async (request, h) => {
    await saveToAnimal(request, h, {})

    request.yar.flash(sessionNames.notifications, {
      text: 'Animal added',
      type: 'success'
    })

    return h.redirect('/animals')
  }
}

export { createController }
