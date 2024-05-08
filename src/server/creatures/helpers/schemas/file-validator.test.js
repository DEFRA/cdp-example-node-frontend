import Joi from 'joi'
import { fileValidator } from '~/src/server/creatures/helpers/schemas/file-validator'

describe('#file-validator', () => {
  test('custom file validator works when theres no errors', () => {
    const payload = {
      fileId: '8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      actualContentType: 'image/jpeg',
      filename: 'test.jpg',
      contentType: 'image/jpeg',
      s3Key:
        '67a59856-6195-40be-a49b-5d9612a740f8/8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      s3Bucket: 'cdp-example-node-frontend',
      fileStatus: 'complete',
      contentLength: 290618
    }

    const { value, error } = fileValidator.file().validate(payload)

    expect(value).toBe(payload)
    expect(error).toBeUndefined()
  })

  test('fails when there is an error from the uploader', () => {
    const payload = {
      fileId: '8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      actualContentType: 'image/jpeg',
      filename: 'test.jpg',
      contentType: 'image/jpeg',
      fileStatus: 'complete',
      contentLength: 290618,
      hasError: true,
      errorMessage: 'a fake problem'
    }

    const { error } = fileValidator.file().validate(payload)

    expect(error.details[0].message).toEqual('a fake problem')
  })

  test('fails when the filesize is too long', () => {
    const payload = {
      fileId: '8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      actualContentType: 'image/jpeg',
      filename: 'test.jpg',
      contentType: 'image/jpeg',
      fileStatus: 'complete',
      contentLength: 1000
    }

    const { error } = fileValidator.file().maxSize(999).validate(payload)

    expect(error.details[0].message).toEqual(
      'The selected file must be smaller than 999.'
    )
  })

  test('fails when the mime type is wrong', () => {
    const payload = {
      fileId: '8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      actualContentType: 'image/jpeg',
      filename: 'test.jpg',
      contentType: 'image/jpeg',
      fileStatus: 'complete',
      contentLength: 1000
    }

    const { error } = fileValidator
      .file()
      .mimeType(['image/gif', 'image/png'])
      .validate(payload)

    expect(error.details[0].message).toEqual(
      'The selected file must be a gif, png.'
    )
  })

  test('fails when the file is empty (0 bytes)', () => {
    const payload = {
      fileId: '8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      actualContentType: 'image/jpeg',
      filename: 'test.jpg',
      contentType: 'image/jpeg',
      fileStatus: 'complete',
      contentLength: 0
    }

    const { error } = fileValidator.file().validate(payload)

    expect(error.details[0].message).toEqual('The selected file is empty.')
  })

  test('fails when the file is empty (0 bytes) but includes the filename', () => {
    const payload = {
      fileId: '8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      actualContentType: 'image/jpeg',
      filename: 'test.jpg',
      contentType: 'image/jpeg',
      fileStatus: 'complete',
      contentLength: 0
    }

    const { error } = fileValidator.file().showFileName().validate(payload)

    expect(error.details[0].message).toEqual('test.jpg is empty.')
  })

  test('fails when no file was supplied', () => {
    const payload = {
      fileId: '8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      actualContentType: 'image/jpeg',
      contentType: 'application/octet-stream',
      fileStatus: 'complete',
      contentLength: 0
    }

    const { error } = fileValidator.file().validate(payload)

    expect(error.details[0].message).toEqual('A file is required.')
  })

  test('we can scan an array of files where one fails', () => {
    const payloadOk = {
      fileId: '8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      actualContentType: 'image/jpeg',
      filename: 'york-food-recipt.jpg',
      contentType: 'image/jpeg',
      s3Key:
        '67a59856-6195-40be-a49b-5d9612a740f8/8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      s3Bucket: 'cdp-example-node-frontend',
      fileStatus: 'complete',
      contentLength: 290618
    }

    const payloadBad = {
      fileId: '8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      actualContentType: 'image/jpeg',
      filename: 'york-food-recipt.jpg',
      contentType: 'image/jpeg',
      s3Key:
        '67a59856-6195-40be-a49b-5d9612a740f8/8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      s3Bucket: 'cdp-example-node-frontend',
      fileStatus: 'complete',
      contentLength: 290618,
      hasError: true,
      errorMessage: 'The selected file has a virus.'
    }

    const { error } = Joi.array()
      .items(fileValidator.file())
      .validate([payloadOk, payloadBad])

    expect(error.details[0].message).toEqual('The selected file has a virus.')
  })

  test('we can scan an array of files where one fails where it could also be an object', () => {
    const payloadOk = {
      fileId: '8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      actualContentType: 'image/jpeg',
      filename: 'test.jpg',
      contentType: 'image/jpeg',
      s3Key:
        '67a59856-6195-40be-a49b-5d9612a740f8/8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      s3Bucket: 'cdp-example-node-frontend',
      fileStatus: 'complete',
      contentLength: 290618
    }

    const payloadBad = {
      fileId: '8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      actualContentType: 'image/jpeg',
      filename: 'virus.jpg',
      contentType: 'image/jpeg',
      s3Key:
        '67a59856-6195-40be-a49b-5d9612a740f8/8b2acda5-4f47-4fa7-bccc-2476f5e3afaa',
      s3Bucket: 'cdp-example-node-frontend',
      fileStatus: 'complete',
      contentLength: 290618,
      hasError: true,
      errorMessage: 'The selected file has a virus.'
    }

    const creaturesFileSchema = fileValidator
      .file()
      .maxSize(1024 * 10000)
      .mimeType(['image/jpg', 'image/jpeg', 'image/png', 'image/gif'])

    const { error } = Joi.object({
      file: Joi.alternatives()
        .try(
          Joi.array().items(creaturesFileSchema.showFileName()),
          creaturesFileSchema
        )
        .required()
    }).validate({ file: [payloadOk, payloadBad] })
    expect(error.details[0].message).toEqual('virus.jpg has a virus.')
  })
})
