import { noSessionRedirect } from '~/src/server/creatures/helpers/ext/no-session-redirect'
import { provideCreatureSession } from '~/src/server/creatures/helpers/pre/provide-creature-session'

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
      creatureSession,
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
