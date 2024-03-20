import { initUpload } from '~/src/server/common/helpers/upload/uploader'

const uploadFormController = {
  handler: async (request, h) => {
    const secureUpload = await initUpload(request, h, {
      successRedirect: 'http://localhost:3000/creatures/upload/success',
      failureRedirect: 'http://localhost:3000/creatures/upload/failure',
      scanResultCallback: 'http://localhost:3000', // TODO
      fileDestination: 'http://localhost:3000' // TODO
    })

    return h.view('creatures/views/upload-form', {
      pageTitle: 'Add creature',
      action: secureUpload.url,
      heading: 'Seen a mythical creature?',
      kindsOfCreatures: [
        {
          text: ' - - select - - ',
          disabled: true,
          attributes: { selected: true }
        },
        {
          value: 'banshee',
          text: 'Banshee'
        },
        {
          value: 'chimera',
          text: 'Chimera'
        },
        {
          value: 'griffen',
          text: 'Griffen'
        },
        {
          value: 'mermaid',
          text: 'Mermaid'
        },
        {
          value: 'minotaur',
          text: 'Minotaur'
        },
        {
          value: 'unicorn',
          text: 'Unicorn'
        },
        {
          value: 'werewolf',
          text: 'Werewolf'
        }
      ],
      breadcrumbs: [
        {
          text: 'Creatures',
          href: '/creatures'
        },
        {
          text: 'Add creature'
        }
      ]
    })
  }
}

export { uploadFormController }
