import { provideAnimalSession } from '../helpers/pre/provide-animal-session.js'

const summaryFormController = {
  options: {
    pre: [provideAnimalSession]
  },
  handler: async (request, h) => {
    const animalSession = request.pre.animalSession

    return h.view('uploads/multistep-form/views/summary-form', {
      pageTitle: 'Summary',
      action: '/uploads/multistep-form/add/create',
      heading: 'Summary',
      animalSession,
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
          text: 'Your details',
          href: '/uploads/multistep-form/add/your-details'
        },
        {
          text: 'Summary'
        }
      ]
    })
  }
}

export { summaryFormController }
