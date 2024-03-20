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
          text: 'Add creature',
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
