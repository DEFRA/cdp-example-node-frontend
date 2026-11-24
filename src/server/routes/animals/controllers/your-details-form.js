const yourDetailsFormController = {
  handler: async (request, h) => {
    return h.view('animals/views/your-details-form', {
      pageTitle: 'Your details',
      action: '/animals/add/your-details',
      heading: 'Your details',
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
          text: 'Kind',
          href: '/animals/add/kind'
        },
        {
          text: 'Upload picture',
          href: '/animals/add/upload-picture'
        },
        {
          text: 'Your details'
        }
      ]
    })
  }
}

export { yourDetailsFormController }
