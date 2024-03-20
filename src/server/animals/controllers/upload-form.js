import qs from 'qs'

import { initUpload } from '~/src/server/common/helpers/upload/uploader'
import { sessionNames } from '~/src/server/common/constants/session-names'

const uploadFormController = {
  handler: async (request, h) => {
    const animalSession = request.yar.get(sessionNames.animals)
    const { id } = animalSession
    const queryString = qs.stringify({ id }, { addQueryPrefix: true })

    const secureUpload = await initUpload(request, h, {
      successRedirect: `http://localhost:3000/animals/upload/success${queryString}`, // TODO
      failureRedirect: `http://localhost:3000/animals/upload/failure${queryString}`, // TODO
      scanResultCallback: `http://localhost:3000${queryString}`, // TODO
      fileDestination: `http://localhost:3000${queryString}` // TODO
    })

    return h.view('animals/views/upload-form', {
      pageTitle: 'Add animal',
      action: secureUpload.url,
      heading: 'Seen an Animal?',
      breadcrumbs: [
        {
          text: 'Animals',
          href: '/animals'
        },
        {
          text: 'Details',
          href: '/animals/add/details'
        },
        {
          text: 'Kind',
          href: '/animals/add/kind'
        },
        {
          text: 'Upload picture'
        }
      ]
    })
  }
}

export { uploadFormController }
