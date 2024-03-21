import { provideAnimalSession } from '~/src/server/animals/helpers/pre/provide-animal-session'

const summaryFormController = {
  options: {
    pre: [provideAnimalSession]
  },
  handler: async (request, h) => {
    const animalSession = request.pre.animalSession

    return h.view('animals/views/summary-form', {
      pageTitle: 'Summary',
      action: '/animals/add/create',
      heading: 'Summary',
      animalSession,
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
          text: 'Your details',
          href: '/animals/add/your-details'
        },
        {
          text: 'Summary'
        }
      ]
    })
  }
}

export { summaryFormController }
