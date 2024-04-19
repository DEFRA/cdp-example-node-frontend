import { getPlants } from '~/src/server/plants/helpers/fetch/get-plants'

const plantListController = {
  handler: async (request, h) => {
    const json = await getPlants()

    return h.view('plants/views/list', {
      pageTitle: 'Plants',
      heading: 'Plants',
      plants: json?.plants ?? []
    })
  }
}

export { plantListController }
