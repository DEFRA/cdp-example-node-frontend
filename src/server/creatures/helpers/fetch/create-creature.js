import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'

async function createCreature(creatureId, creature) {
  const endpoint = config.get('cdpExampleNodeBackendUrl') + '/creatures'

  const creatureFiles = creature.creatureFiles
  const creatureFileUrls = (
    Array.isArray(creatureFiles) ? creatureFiles : [creatureFiles]
  )
    .map((f) => f?.s3Key)
    .filter(Boolean)

  const evidenceFiles = creature.evidenceFiles
  const evidenceFileUrls = (
    Array.isArray(evidenceFiles) ? evidenceFiles : [evidenceFiles]
  )
    .map((f) => f?.s3Key)
    .filter(Boolean)

  const { json } = await fetcher(endpoint, {
    method: 'post',
    body: JSON.stringify({
      creatureId,
      kind: creature.kind,
      ...(creatureFileUrls.length > 0 && { creatureFileUrls }),
      date: `${creature.day}-${creature.month}-${creature.year}`,
      dream: creature.realSighting === 'yes',
      address: {
        addressLine1: creature.addressLine1,
        addressLine2: creature.addressLine2,
        townOrCity: creature.addressTown,
        postCode: creature.addressPostcode
      },
      ...(evidenceFileUrls.length > 0 && { evidenceFileUrls })
    })
  })

  return json
}

export { createCreature }
