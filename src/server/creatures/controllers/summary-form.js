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

    return h.view('creatures/views/summary-form', {
      pageTitle: 'Summary',
      action: `/creatures/${creatureId}/create`,
      heading: 'Summary',
      creature: sessionToCreature(creatureSession),
      breadcrumbs: [
        {
          text: 'Creatures',
          href: '/creatures'
        },
        {
          text: 'Add creature sighting',
          href: `/creatures/${creatureId}/upload`
        },
        {
          text: 'Summary'
        }
      ]
    })
  }
}

export { summaryFormController }
