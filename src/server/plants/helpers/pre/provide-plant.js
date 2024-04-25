import { getPlant } from '~/src/server/plants/helpers/fetch/get-plant'

const providePlant = {
  method: async (request) => await getPlant(request.params.plantId),
  assign: 'plant'
}

export { providePlant }
