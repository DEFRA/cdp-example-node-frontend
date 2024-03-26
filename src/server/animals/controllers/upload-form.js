import { provideAnimalSession } from '~/src/server/animals/helpers/pre/provide-animal-session'

const uploadFormController = {
  options: {
    pre: [provideAnimalSession]
  },
  handler: async (request, h) => {
    const animalSession = request.pre.animalSession
    const uploadError = animalSession?.uploadStatus?.error

    return h.view('animals/views/upload-form', {
      pageTitle: 'Add animal',
      uploadError,
      action: animalSession.secureUpload.url,
      heading: 'Seen an Animal?',
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
          text: 'Upload picture'
        }
      ]
    })
  }
}

export { uploadFormController }
