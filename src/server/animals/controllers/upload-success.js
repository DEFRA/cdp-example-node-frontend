// TODO
const uploadSuccessController = {
  handler: (request, h) => {
    return h.view('animals/views/upload-success', {
      pageTitle: 'Congratulations',
      heading: 'Congratulations',
      breadcrumbs: [
        {
          text: 'Animals',
          href: '/animals'
        },
        {
          text: 'Add animal',
          href: '/animals/upload'
        },
        {
          text: 'Success'
        }
      ]
    })
  }
}

export { uploadSuccessController }
