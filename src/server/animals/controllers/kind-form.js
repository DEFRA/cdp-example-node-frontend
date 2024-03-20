const kindFormController = {
  handler: async (request, h) => {
    return h.view('animals/views/kind-form', {
      pageTitle: 'Kind',
      action: '/animals/add/kind',
      heading: 'Kind',
      kindsOfAnimals: [
        {
          text: ' - - select - - ',
          disabled: true,
          attributes: { selected: true }
        },
        {
          value: 'rabbit',
          text: 'Rabbit'
        },
        {
          value: 'cow',
          text: 'Cow'
        },
        {
          value: 'horse',
          text: 'Horse'
        },
        {
          value: 'otter',
          text: 'Otter'
        },
        {
          value: 'yak',
          text: 'Yak'
        }
      ],
      breadcrumbs: [
        {
          text: 'Animals',
          href: '/animals'
        },
        {
          text: 'Details',
          href: '/animals/add/details'
        },
        {
          text: 'Kind'
        }
      ]
    })
  }
}

export { kindFormController }
