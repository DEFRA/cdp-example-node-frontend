const animalController = {
  handler: (request, h) => {
    return h.view('animals/views/animal', {
      pageTitle: 'Animal',
      heading: 'Animal',
      breadcrumbs: [
        {
          text: 'Animals',
          href: '/animals'
        },
        {
          text: 'Animal'
        }
      ]
    })
  }
}

export { animalController }
