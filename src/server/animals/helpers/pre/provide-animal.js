import { getAnimal } from '~/src/server/animals/helpers/fetch/get-animal'

const provideAnimal = {
  method: async (request, h) => {
    const { animal } = (await getAnimal(request.params.animalId)) ?? {}

    if (animal) {
      // TODO a little awkward/brittle - can the info from the uploader be more fine grained and list bucket and key?
      const filePathParts = animal.fileUrl.split('/')
      const key = filePathParts.slice(1).join('/')

      const fileUrl = '/file/' + key

      return {
        ...animal,
        fileUrl
      }
    }

    return null
  },
  assign: 'animal'
}

export { provideAnimal }
