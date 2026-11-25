import { noSessionRedirect } from '../helpers/ext/no-session-redirect.js'
import { provideCreatureSession } from '../helpers/pre/provide-creature-session.js'
import { sessionToCreature } from '../transformers/session-to-creature.js'

const summaryFormController = {
  options: {
    ext: {
      onPreHandler: [noSessionRedirect]
    },
    pre: [provideCreatureSession]
  },
  handler: async (request, h) => {
    const creatureId = request.params.creatureId
    const creatureSession = request.pre.creatureSession

    return h.view('uploads/multiple-files/views/summary-form', {
      pageTitle: 'Summary',
      action: `/uploads/multiple-files/${creatureId}/create`,
      heading: 'Summary',
      creature: sessionToCreature(creatureSession),
      breadcrumbs: [
        {
          text: 'File uploads',
          href: '/uploads'
        },
        {
          text: 'Multiple files',
          href: '/uploads/multiple-files'
        },
        {
          text: 'Add creature sighting',
          href: `/uploads/multiple-files/${creatureId}/upload`
        },
        {
          text: 'Summary'
        }
      ]
    })
  }
}

export { summaryFormController }
