import { providePlantSession } from '~/src/server/plants/helpers/pre/provide-plant-session'

const summaryFormController = {
  options: {
    pre: [providePlantSession]
  },
  handler: async (request, h) => {
    const plantSession = request.pre.plantSession

    return h.view('plants/views/summary-form', {
      pageTitle: 'Summary',
      action: '/plants/add/create',
      heading: 'Summary',
      plantSession,
      breadcrumbs: [
        {
          text: 'Plants',
          href: '/plants'
        },
        {
          text: 'Details',
          href: '/plants/add/details'
        },
        {
          text: 'Upload pictures',
          href: '/plants/add/upload-pictures'
        },
        {
          text: 'Summary'
        }
      ]
    })
  }
}

export { summaryFormController }
