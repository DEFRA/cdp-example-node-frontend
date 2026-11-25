import { getAnimals } from '../helpers/fetch/get-animals.js'

const animalListController = {
  handler: async (request, h) => {
    const json = await getAnimals()

    return h.view('uploads/multistep-form/views/list', {
      pageTitle: 'Upload in a multistep form',
      heading: 'Upload in a multistep form',
      animals: json?.animals ?? []
    })
  }
}

export { animalListController }
