const uploadFailureController = {
  handler: (request, h) => {
    return h.view('creatures/views/upload-failure', {
      pageTitle: 'Commiserations',
      heading: 'Commiserations',
      breadcrumbs: [
        {
          text: 'Creatures',
          href: '/creatures'
        },
        {
          text: 'Add creature',
          href: '/creatures/upload'
        },
        {
          text: 'Failure'
        }
      ]
    })
  }
}

export { uploadFailureController }
