const uploadSuccessController = {
  handler: (request, h) => {
    return h.view('creatures/views/upload-success', {
      pageTitle: 'Congratulations',
      heading: 'Congratulations',
      breadcrumbs: [
        {
          text: 'Creatures',
          href: '/creatures'
        },
        {
          text: 'Upload details',
          href: '/creatures/upload'
        },
        {
          text: 'Success'
        }
      ]
    })
  }
}

export { uploadSuccessController }
