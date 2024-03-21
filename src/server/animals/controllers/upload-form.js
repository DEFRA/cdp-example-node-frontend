import { initUpload } from '~/src/server/common/helpers/upload/init-upload'
import { saveToAnimal } from '~/src/server/animals/helpers/form/save-to-animal'

const uploadFormController = {
  handler: async (request, h) => {
    const secureUpload = await initUpload({
      successRedirect: 'http://localhost:3000/animals/add/your-details',
      failureRedirect: 'http://localhost:3000/animals/add/upload-picture',
      scanResultCallback: 'http://localhost:3000',
      destinationBucket: 'my-bucket',
      acceptedMimeTypes: ['.pdf', '.csv', '.png', 'image/jpeg'],
      maxFileSize: 100
    })

    await saveToAnimal(request, h, { uploadId: secureUpload.id })

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
