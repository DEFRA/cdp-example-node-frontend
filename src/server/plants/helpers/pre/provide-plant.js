import { getPlant } from '~/src/server/plants/helpers/fetch/get-plant'

const providePlant = {
  method: async (request, h) => {
    const { plant } = (await getPlant(request.params.plantId)) ?? {}

    if (plant) {
      const fileUrl = '/file/' + plant.fileUrl

      return {
        ...plant,
        fileUrl
      }
    }

    return null
  },
  assign: 'plant'
}

export { providePlant }
