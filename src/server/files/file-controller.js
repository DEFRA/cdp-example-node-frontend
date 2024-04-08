import { s3Client } from '~/src/server/common/helpers/s3-client'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { config } from '~/src/config'

/**
 * Provides access to files in the s3 bucket.
 * In a production system you may want to check the requester has permissions to access the file
 * since this example provides access to any file in the bucket if the requester knows the key.
 */
const fileController = {
  handler: async (request, h) => {
    const fileId = request.params.id

    const command = new GetObjectCommand({
      Bucket: config.get('uploadBucketName'),
      Key: fileId
    })

    try {
      const response = await s3Client.send(command)
      return h
        .response(response.Body)
        .header('Content-Type', response.ContentType)
        .code(200)
    } catch (err) {
      request.logger.error(err)
      return h.response('File Not Found').code(404)
    }
  }
}

export { fileController }
