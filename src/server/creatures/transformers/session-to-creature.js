function buildFilesDetail(value) {
  const files = Array.isArray(value) ? value : [value]

  return files.map((file) => ({
    filename: file.filename,
    fileId: file.fileId,
    fileUrl: file.s3Key
  }))
}

function sessionToCreature(creature) {
  const creatureFiles = buildFilesDetail(creature.fields.creatureFiles)
  const evidenceFiles = buildFilesDetail(creature.fields.evidenceFiles)

  const { year, month, day } = creature.fields.date
  const date = new Date(year, parseInt(month, 10) - 1, day).toISOString()
  const realLifeSighting = creature.fields.realLifeSighting === 'yes'
  const address = realLifeSighting
    ? {
        addressLine1: creature.fields?.addressLine1,
        addressLine2: creature.fields?.addressLine2,
        townOrCity: creature.fields?.addressTown,
        postCode: creature.fields?.addressPostcode
      }
    : {}

  return {
    creatureId: creature.creatureId,
    name: creature.fields.name,
    kind: creature.fields.kind,
    creatureFiles,
    date,
    realLifeSighting,
    address,
    evidenceFiles
  }
}

export { sessionToCreature }
