import { initUpload } from '~/src/helpers/upload/uploader'

const uploadFormController = {
  handler: async (request, h) => {
    const secureUpload = await initUpload(request, h, {
      successRedirect: 'http://localhost:3000/animals/upload/success',
      failureRedirect: 'http://localhost:3000/animals/upload/failure',
      scanResultCallback: 'http://localhost:3000', // TODO
      fileDestination: 'http://localhost:3000' // TODO
    })

    return h.view('animals/views/upload-form', {
      pageTitle: 'Upload details',
      action: secureUpload.url,
      heading: 'Seen an Animal?',
      kindsOfCreatures: [
        {
          text: ' - - select - - ',
          disabled: true,
          attributes: { selected: true }
        },
        {
          value: 'rabbit',
          text: 'Rabbit'
        },
        {
          value: 'cow',
          text: 'Cow'
        },
        {
          value: 'horse',
          text: 'Horse'
        },
        {
          value: 'otter',
          text: 'Otter'
        },
        {
          value: 'yak',
          text: 'Yak'
        }
      ],
      breadcrumbs: [
        {
          text: 'Animals',
          href: '/animals'
        },
        {
          text: 'Upload details'
        }
      ]
    })
  }
}

export { uploadFormController }
