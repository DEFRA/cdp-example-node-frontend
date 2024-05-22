import { upperFirst } from 'lodash'

import { config } from '~/src/config'
import { initUpload } from '~/src/server/common/helpers/upload/init-upload'
import { creatureNames } from '~/src/server/creatures/constants/creature-names'
import { buildOptions } from '~/src/server/common/helpers/options/build-options'
import { noSessionRedirect } from '~/src/server/creatures/helpers/ext/no-session-redirect'
import { sessionNames } from '~/src/server/common/constants/session-names'

const s3Bucket = config.get('bucket')

const uploadFormController = {
  options: {
    ext: {
      onPreHandler: [noSessionRedirect]
    }
  },
  handler: async (request, h) => {
    const creatureId = request.params.creatureId

    const uploadDetail = await initUpload({
      redirect: `/creatures/${creatureId}/upload-status-poller`,
      s3Bucket
    })

    await request.yar.set(sessionNames.creatures, uploadDetail)

    return h.view('creatures/views/upload-form', {
      pageTitle: 'Add creature',
      action: uploadDetail.uploadUrl,
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
