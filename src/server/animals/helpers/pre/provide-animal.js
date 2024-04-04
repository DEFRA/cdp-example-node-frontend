import { config } from '~/src/config'
import { getAnimal } from '~/src/server/animals/helpers/fetch/get-animal'
import { buildS3PresignedUrl } from '~/src/server/common/helpers/aws/build-s3-presigned-url'

const provideAnimal = {
  method: async (request, h) => {
    const { animal } = (await getAnimal(request.params.animalId)) ?? {}

    if (animal) {
      // TODO a little awkward/brittle - can the info from the uploader be more fine grained and list bucket and key?
      const filePathParts = animal.fileUrl.split('/')
      const bucket = filePathParts.at(0)
      const key = filePathParts.slice(1).join('/')

      const presignedFileUrl = await buildS3PresignedUrl({
        bucket,
        key,
        region: config.get('awsRegion')
      })

      return {
        ...animal,
        presignedFileUrl
      }
    }

    return null
  },
  assign: 'animal'
}

export { provideAnimal }
