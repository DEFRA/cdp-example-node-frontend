import { config } from '~/src/config'
import { initUpload } from '~/src/server/common/helpers/upload/init-upload'
import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'

const uploadFormController = {
  handler: async (request, h) => {
    const cdpEnvironment = config.get('cdpEnvironment')
    const uploadBucketName = config.get('uploadBucketName')

    const destinationBucket = `cdp-${cdpEnvironment}-${uploadBucketName}`
    const secureUpload = await initUpload({
      successRedirect: 'http://localhost:3000/animals/add/uploaded',
      failureRedirect: 'http://localhost:3000/animals/add/uploaded',
      scanResultCallback: 'http://localhost:3000',
      acceptedMimeTypes: ['.pdf', '.csv', '.png', 'image/jpeg'],
      maxFileSize: 100,
      destinationBucket
    })

    await saveToAnimal(request, h, { secureUpload })

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
