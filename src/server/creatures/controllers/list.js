import { getCreatures } from '../helpers/fetch/get-creatures.js'

const creatureListController = {
  handler: async (request, h) => {
    const json = await getCreatures()

    return h.view('creatures/views/list', {
      pageTitle: 'Creatures',
      heading: 'Creatures',
      creatures: json?.creatures ?? []
    })
  }
}

export { creatureListController }
