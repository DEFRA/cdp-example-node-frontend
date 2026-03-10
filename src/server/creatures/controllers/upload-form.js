import _ from 'lodash'

import { config } from '../../../config/config.js'
import { initUpload } from '../../common/helpers/upload/init-upload.js'
import { creatureNames } from '../constants/creature-names.js'
import { buildOptions } from '../../common/helpers/options/build-options.js'
import { noSessionRedirect } from '../helpers/ext/no-session-redirect.js'
import { sessionNames } from '../../common/constants/session-names.js'

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

    request.yar.set(sessionNames.creatures, uploadDetail)

    return h.view('creatures/views/upload-form', {
      pageTitle: 'Add creature',
      action: uploadDetail.uploadUrl,
      heading: 'Creature sighting',
      kindsOfCreatures: buildOptions(
        creatureNames.map((name) => ({ value: name, text: _.upperFirst(name) }))
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
