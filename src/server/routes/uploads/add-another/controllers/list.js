import { getPlants } from '../helpers/fetch/get-plants.js'

const plantListController = {
  handler: async (request, h) => {
    const plants = await getPlants()

    return h.view('uploads/add-another/views/list', {
      pageTitle: 'Upload and add another file',
      heading: 'Upload and add another file',
      plants
    })
  }
}

export { plantListController }
