import { GetObjectCommand } from '@aws-sdk/client-s3'
import csvParser from 'papaparse'
import { s3Client } from '../../../common/helpers/s3-client.js'

const parse = csvParser.parse


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
    return []
  }
  let locations = {}
  const headers = 'date,time,latitude,longitude'
  try {
    locations = parse(`${headers}\n${csvBody}`, {
      header: true,
      skipEmptyLines: true
    })
    logger.debug({ locations }, 'Locations')
  } catch (err) {
    logger.error(err)
    return []
  }
  return locations.data
}

export { findTrackingLocations }
