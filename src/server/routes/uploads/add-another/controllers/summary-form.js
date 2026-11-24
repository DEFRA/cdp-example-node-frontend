import { providePlantSession } from '../helpers/pre/provide-plant-session.js'

const summaryFormController = {
  options: {
    pre: [providePlantSession]
  },
  handler: async (request, h) => {
    const plantSession = request.pre.plantSession

    // TODO display virus scan status around here

    return h.view('uploads/add-another/views/summary-form', {
      pageTitle: 'Summary',
      action: '/uploads/add-another/add/create',
      heading: 'Summary',
      plantSession,
      breadcrumbs: [
        {
          text: 'File uploads',
          href: '/uploads'
        },
        {
          text: 'Add another file',
          href: '/uploads/add-another'
        },
        {
          text: 'Details',
          href: '/uploads/add-another/add/details'
        },
        {
          text: 'Upload pictures',
          href: '/uploads/add-another/add/upload-pictures'
        },
        {
          text: 'Summary'
        }
      ]
    })
  }
}

export { summaryFormController }
