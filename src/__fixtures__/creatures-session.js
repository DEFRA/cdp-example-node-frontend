const creaturesSessionFixture = {
  creatureId: 'fedc8e3b-cfd1-4aec-b659-f949f65bedf9',
  uploadId: '7ca0496d-d7a7-40fc-aef4-2a46d1a9ce00',
  fields: {
    name: 'HarRy',
    kind: 'leprechaun',
    realLifeSighting: 'yes',
    addressLine1: 'Cadbury Lane',
    addressLine2: 'chocolate street',
    addressTown: 'Oxford',
    addressPostcode: 'OX61RT',
    creatureFiles: {
      fileId: 'aa710148-ae23-4864-ac63-cf4698e4acd7',
      actualContentType: 'image/webp',
      filename: 'shoot.jpg',
      contentType: 'image/jpeg',
      s3Key:
        '7ca0496d-d7a7-40fc-aef4-2a46d1a9ce00/aa710148-ae23-4864-ac63-cf4698e4acd7',
      s3Bucket: 'cdp-example-node-frontend',
      fileStatus: 'complete',
      contentLength: 25624
    },
    evidenceFiles: {
      fileId: 'e9963130-00cf-48e3-baa4-347670fff937',
      actualContentType: 'image/jpeg',
      filename: 'yak.jpeg',
      contentType: 'image/jpeg',
      s3Key:
        '7ca0496d-d7a7-40fc-aef4-2a46d1a9ce00/e9963130-00cf-48e3-baa4-347670fff937',
      s3Bucket: 'cdp-example-node-frontend',
      fileStatus: 'complete',
      contentLength: 57573
    },
    date: {
      day: '4',
      month: '5',
      year: '1989'
    }
  }
}

export { creaturesSessionFixture }
