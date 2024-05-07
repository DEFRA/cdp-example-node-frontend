import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'

function buildFilesDetail(value) {
  const files = Array.isArray(value) ? value : [value]

  return files.map((file) => ({
    filename: file.filename,
    fileId: file.fileId,
    fileUrl: file.s3Key
  }))
}

// TOO create transform and use in summary
async function createCreature(creature) {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + '/creatures'

  const creatureFiles = buildFilesDetail(creature.fields.creatureFiles)
  const evidenceFiles = buildFilesDetail(creature.fields.evidenceFiles)

  const { year, month, day } = creature.fields.date
  const date = new Date(year, parseInt(month, 10) - 1, day).toISOString()

  const { json } = await fetcher(endpoint, {
    method: 'post',
    body: JSON.stringify({
      creatureId: creature.creatureId,
      kind: creature.fields.kind,
      creatureFiles,
      date,
      realLifeSighting: creature.fields.realLifeSighting === 'yes',
      address: {
        addressLine1: creature.fields?.addressLine1,
        addressLine2: creature.fields?.addressLine2,
        townOrCity: creature.fields?.addressTown,
        postCode: creature.fields?.addressPostcode
      },
      evidenceFiles
    })
  })

  return json
}

export { createCreature }
