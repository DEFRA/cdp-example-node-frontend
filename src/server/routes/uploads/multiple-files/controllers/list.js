import { getCreatures } from '../helpers/fetch/get-creatures.js'

const creatureListController = {
  handler: async (request, h) => {
    const json = await getCreatures()

    return h.view('uploads/multiple-files/views/list', {
      pageTitle: 'Upload multiple files',
      heading: 'Upload multiple files',
      creatures: json?.creatures ?? []
    })
  }
}

export { creatureListController }
