const uploadFailureController = {
  handler: (request, h) => {
    return h.view('animals/views/upload-failure', {
      pageTitle: 'Commiserations',
      heading: 'Commiserations',
      breadcrumbs: [
        {
          text: 'Animals',
          href: '/animals'
        },
        {
          text: 'Upload details',
          href: '/animals/upload'
        },
        {
          text: 'Failure'
        }
      ]
    })
  }
}

export { uploadFailureController }
