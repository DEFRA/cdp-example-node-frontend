const detailsFormController = {
  handler: async (request, h) => {
    return h.view('plants/views/details-form', {
      pageTitle: 'Details',
      action: '/plants/add/details',
      heading: 'Details',
      breadcrumbs: [
        {
          text: 'Plants',
          href: '/plants'
        },
        {
          text: 'Details'
        }
      ]
    })
  }
}

export { detailsFormController }
