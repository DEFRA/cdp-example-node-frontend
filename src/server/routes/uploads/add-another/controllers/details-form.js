const detailsFormController = {
  handler: async (request, h) => {
    return h.view('uploads/add-another/views/details-form', {
      pageTitle: 'Details',
      action: '/uploads/add-another/add/details',
      heading: 'Details',
      breadcrumbs: [
        {
          text: 'File uploads',
          href: '/uploads'
        },
        {
          text: 'Add another file',
          href: '/uploads/add-another'
        },
        {
          text: 'Details'
        }
      ]
    })
  }
}

export { detailsFormController }
