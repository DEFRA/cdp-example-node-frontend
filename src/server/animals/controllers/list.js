const animalListController = {
  handler: (request, h) => {
    return h.view('animals/views/list', {
      pageTitle: 'Animals',
      heading: 'Animals',
      creatures: []
    })
  }
}

export { animalListController }
