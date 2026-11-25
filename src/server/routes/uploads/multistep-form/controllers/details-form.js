const detailsFormController = {
  handler: async (request, h) => {
    return h.view('uploads/multistep-form/views/details-form', {
      pageTitle: 'Details',
      action: '/uploads/multistep-form/add/details',
      heading: 'Details',
      breadcrumbs: [
        {
          text: 'File uploads',
          href: '/uploads'
        },
        {
          text: 'In a multistep form',
          href: '/uploads/multistep-form'
        },
        {
          text: 'Details'
        }
      ]
    })
  }
}

export { detailsFormController }
