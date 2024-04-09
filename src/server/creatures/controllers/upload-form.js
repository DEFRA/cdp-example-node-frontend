import { initUpload } from '~/src/server/common/helpers/upload/init-upload'
import { config } from '~/src/config'

const uploadFormController = {
  handler: async (request, h) => {
    const destinationBucket = config.get('bucket')
    const appBaseUrl = config.get('appBaseUrl')

    const secureUpload = await initUpload({
      successRedirect: `${appBaseUrl}/creatures/upload/success`,
      failureRedirect: `${appBaseUrl}/creatures/upload/failure`,
      scanResultCallback: `${appBaseUrl}`,
      destinationBucket,
      acceptedMimeTypes: ['.pdf', '.csv', '.png', 'image/jpeg'],
      maxFileSize: 100
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
          value: 'hecatoncheires',
          text: 'Hecatoncheires'
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
