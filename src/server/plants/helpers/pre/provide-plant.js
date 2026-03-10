import { getPlant } from '../fetch/get-plant.js'

const providePlant = {
  method: async (request) => await getPlant(request.params.plantId),
  assign: 'plant'
}

export { providePlant }
