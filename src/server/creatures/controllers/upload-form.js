import {initUpload} from "~/src/server/common/helpers/cdp-uploader";

const uploadFormController = {
  handler: async (request, h) => {

    const secureUpload = await initUpload()

    return h.view('creatures/views/upload-form', {
      action: secureUpload.url,
      pageTitle: 'Upload details',
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
          text: 'Upload details'
        }
      ]
    })
  }
}

export { uploadFormController }
