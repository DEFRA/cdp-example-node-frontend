import { sessionNames } from '~/src/server/common/constants/session-names'
import { createAnimal } from '~/src/server/animals/helpers/fetch/create-animal'
import { provideAnimalSession } from '~/src/server/animals/helpers/pre/provide-animal-session'

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
