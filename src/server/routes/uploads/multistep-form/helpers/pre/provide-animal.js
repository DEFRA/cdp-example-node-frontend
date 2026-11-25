import { getAnimal } from '../fetch/get-animal.js'

const provideAnimal = {
  method: async (request, h) => {
    const { animal } = (await getAnimal(request.params.animalId)) ?? {}

    if (animal) {
      return animal
    }

    return null
  },
  assign: 'animal'
}

export { provideAnimal }
