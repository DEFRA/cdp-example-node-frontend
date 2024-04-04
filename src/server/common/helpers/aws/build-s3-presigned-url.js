import { fromNodeProviderChain } from '@aws-sdk/credential-providers'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

import { config } from '~/src/config'

async function buildS3PresignedUrl({ bucket, key, region }) {
  const client = new S3Client({
    credentials: fromNodeProviderChain(),
    ...(config.get('isDevelopment') && {
      endpoint: config.get('localstackEndpoint'),
      forcePathStyle: true
    })
  })

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    Region: region
  })

  return await getSignedUrl(client, command)
}

export { buildS3PresignedUrl }
