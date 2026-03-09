import { sessionNames } from '../../common/constants/session-names.js'
import { createAnimal } from '../helpers/fetch/create-animal.js'
import { provideAnimalSession } from '../helpers/pre/provide-animal-session.js'

const createController = {
  options: {
    pre: [provideAnimalSession]
  },
  handler: async (request, h) => {
    const animalSession = request.pre.animalSession

    const json = await createAnimal(animalSession)
    const name = json?.animal?.name

    request.yar.clear(sessionNames.animals)
    request.yar.flash(sessionNames.notifications, {
      text: `Animal ${name} added`,
      type: 'success'
    })

    return h.redirect('/animals')
  }
}

export { createController }
