const creatureListController = {
  handler: (request, h) => {
    return h.view('creatures/views/list', {
      pageTitle: 'Creatures',
      heading: 'Creatures',
      creatures: []
    })
  }
}

export { creatureListController }
