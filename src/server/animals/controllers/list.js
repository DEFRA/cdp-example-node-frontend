import { getAnimals } from '~/src/server/animals/helpers/fetch/get-animals'

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
