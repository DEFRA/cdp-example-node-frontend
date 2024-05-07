import { getCreatures } from '~/src/server/creatures/helpers/fetch/get-creatures'

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
