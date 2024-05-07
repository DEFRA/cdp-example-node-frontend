import { GetObjectCommand } from '@aws-sdk/client-s3'
import { parse } from 'papaparse'

import { s3Client } from '~/src/server/common/helpers/s3-client'

async function findTrackingLocations(tracking, logger) {
  const { s3Bucket, s3Key } = tracking.fileDetails

  const command = new GetObjectCommand({
    Bucket: s3Bucket,
    Key: s3Key,
    ResponseContentType: 'text/csv'
  })
  let csvBody
  try {
    const s3Response = await s3Client.send(command)
    csvBody = await s3Response.Body.transformToString()
    logger.debug('File content:' + csvBody)
  } catch (err) {
    logger.error(err)
  }
  let locations = {}
  try {
    locations = parse(csvBody, { header: false })
    logger.debug({ locations }, 'Locations')
  } catch (err) {
    logger.error(err)
  }
  const trackingLocations = locations.data.map((location) => {
    return {
      date: location[0],
      time: location[1],
      latitude: location[2],
      longitude: location[3]
    }
  })
  return trackingLocations
}

export { findTrackingLocations }
