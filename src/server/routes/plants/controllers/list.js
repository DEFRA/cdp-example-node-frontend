import { getPlants } from '../helpers/fetch/get-plants.js'

const plantListController = {
  handler: async (request, h) => {
    const plants = await getPlants()

    return h.view('plants/views/list', {
      pageTitle: 'Plants',
      heading: 'Plants',
      plants
    })
  }
}

export { plantListController }
