import { initUpload } from '~/src/server/common/helpers/upload/init-upload'
import { config } from '~/src/config'
import crypto from 'node:crypto'

const uploadFormController = {
  handler: async (request, h) => {
    const destinationBucket = config.get('bucket')
    const appBaseUrl = config.get('appBaseUrl')

    const creatureId = crypto.randomUUID()
    const secureUpload = await initUpload({
      redirect: `${appBaseUrl}/creatures/${creatureId}/add`, // map an id back to an upload id
      destinationBucket
    })

    // store our id to uploadId mapping and use this for verification to ensure upload is genuine
    await request.redis.storeCreatureId(creatureId, secureUpload.uploadId)

    return h.view('creatures/views/upload-form', {
      pageTitle: 'Add creature',
      action: secureUpload.uploadAndScanUrl,
      heading: 'Report mythical creature sighting',
      kindsOfCreatures: [
        {
          text: ' - - select - - ',
          disabled: true,
          attributes: { selected: true }
        },
        {
          value: 'Dragon',
          text: 'Dragon'
        },
        {
          value: 'Werewolf',
          text: 'Werewolf'
        },
        {
          value: 'Vampire',
          text: 'Vampire'
        },
        {
          value: 'Mermaid',
          text: 'Mermaid'
        },
        {
          value: 'Unicorn',
          text: 'Unicorn'
        },
        {
          value: 'Fairy',
          text: 'Fairy'
        },
        {
          value: 'Leprechaun',
          text: 'Leprechaun'
        },
        {
          value: 'Gnome',
          text: 'Gnome'
        }
      ],
      breadcrumbs: [
        {
          text: 'Creatures',
          href: '/creatures'
        },
        {
          text: 'Add creature sighting'
        }
      ]
    })
  }
}

export { uploadFormController }
