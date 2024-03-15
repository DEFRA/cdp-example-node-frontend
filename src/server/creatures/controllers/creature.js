const creatureController = {
  handler: (request, h) => {
    return h.view('creatures/views/creature', {
      pageTitle: 'Creature',
      heading: 'Creature',
      breadcrumbs: [
        {
          text: 'Creatures',
          href: '/creatures'
        },
        {
          text: 'Creature'
        }
      ]
    })
  }
}

export { creatureController }
