const yourDetailsFormController = {
  handler: async (request, h) => {
    return h.view('uploads/multistep-form/views/your-details-form', {
      pageTitle: 'Your details',
      action: '/uploads/multistep-form/add/your-details',
      heading: 'Your details',
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
          text: 'Details',
          href: '/uploads/multistep-form/add/details'
        },
        {
          text: 'Kind',
          href: '/uploads/multistep-form/add/kind'
        },
        {
          text: 'Upload picture',
          href: '/uploads/multistep-form/add/upload-picture'
        },
        {
          text: 'Your details'
        }
      ]
    })
  }
}

export { yourDetailsFormController }
