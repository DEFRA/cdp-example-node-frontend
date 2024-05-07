import { upperFirst } from 'lodash'

import { config } from '~/src/config'
import { initUpload } from '~/src/server/common/helpers/upload/init-upload'
import { creatureNames } from '~/src/server/creatures/constants/creature-names'
import { buildOptions } from '~/src/server/common/helpers/options/build-options'
import { noSessionRedirect } from '~/src/server/creatures/helpers/ext/no-session-redirect'

const destinationBucket = config.get('bucket')
const appBaseUrl = config.get('appBaseUrl')

const uploadFormController = {
  options: {
    ext: {
      onPreHandler: [noSessionRedirect]
    }
  },
  handler: async (request, h) => {
    const creatureId = request.params.creatureId

    const secureUpload = await initUpload({
      redirect: `${appBaseUrl}/creatures/${creatureId}/upload-status-poller`,
      destinationBucket
    })

    await request.redis.storeData(creatureId, {
      uploadId: secureUpload.uploadId
    })

    return h.view('creatures/views/upload-form', {
      pageTitle: 'Add creature',
      action: secureUpload.uploadAndScanUrl,
      heading: 'Creature sighting',
      kindsOfCreatures: buildOptions(
        creatureNames.map((name) => ({ value: name, text: upperFirst(name) }))
      ),
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
