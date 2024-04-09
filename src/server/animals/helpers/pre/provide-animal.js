import { getAnimal } from '~/src/server/animals/helpers/fetch/get-animal'

const provideAnimal = {
  method: async (request, h) => {
    const { animal } = (await getAnimal(request.params.animalId)) ?? {}

    if (animal) {
      const fileUrl = '/file/' + encodeURIComponent(animal.fileUrl)

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
