import { sessionNames } from '~/src/server/common/constants/session-names'
import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'
import { initUpload } from '~/src/server/common/helpers/upload/init-upload'

const startController = {
  handler: async (request, h) => {
    request.yar.clear(sessionNames.animals)
    request.yar.clear(sessionNames.validationFailure)

    const secureUpload = await initUpload({
      successRedirect: 'http://localhost:3000/animals/add/your-details',
      failureRedirect: 'http://localhost:3000/animals/add/upload-picture',
      scanResultCallback: 'http://localhost:3000',
      destinationBucket: 'my-bucket',
      acceptedMimeTypes: ['.pdf', '.csv', '.png', 'image/jpeg'],
      maxFileSize: 100
    })

    await saveToAnimal(request, h, { secureUpload })

    return h.redirect('/animals/add/details')
  }
}

export { startController }
