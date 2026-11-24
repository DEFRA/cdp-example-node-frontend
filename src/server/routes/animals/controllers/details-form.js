const detailsFormController = {
  handler: async (request, h) => {
    return h.view('animals/views/details-form', {
      pageTitle: 'Details',
      action: '/animals/add/details',
      heading: 'Details',
      breadcrumbs: [
        {
          text: 'Animals',
          href: '/animals'
        },
        {
          text: 'Details'
        }
      ]
    })
  }
}

export { detailsFormController }
