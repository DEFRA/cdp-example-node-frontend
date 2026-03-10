import { getAnimals } from '../helpers/fetch/get-animals.js'

const animalListController = {
  handler: async (request, h) => {
    const json = await getAnimals()

    return h.view('animals/views/list', {
      pageTitle: 'Animals',
      heading: 'Animals',
      animals: json?.animals ?? []
    })
  }
}

export { animalListController }
