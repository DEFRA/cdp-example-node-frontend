import nock from 'nock'

import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'
import { getError, NoErrorThrownError } from '~/test-helpers/get-error'
import { productsFixture } from '~/src/__fixtures__/products'

describe('#fetcher', () => {
  const productsEndpoint = config.get('cdpExampleNodeBackendUrl') + '/products'
  const productsEndpointUrl = new URL(productsEndpoint)

  test('Should provide expected libraries response', async () => {
    nock(productsEndpointUrl.origin)
      .get(productsEndpointUrl.pathname)
      .reply(200, productsFixture)

    const { json: productsResponse } = await fetcher(productsEndpoint)

    expect(productsResponse).toEqual(productsFixture)
  })

  test('With error, Should throw with expected message', async () => {
    nock(productsEndpointUrl.origin)
      .get(productsEndpointUrl.pathname)
      .reply(407, { message: 'Woaaaaaaaaaaaaaaaah calm down!' })

    const error = await getError(async () => fetcher(productsEndpoint))

    expect(error).not.toBeInstanceOf(NoErrorThrownError)
    expect(error).toBeInstanceOf(Error)
    expect(error).toHaveProperty('message', 'Woaaaaaaaaaaaaaaaah calm down!')
  })

  test('With different status code, Should throw with expected message', async () => {
    nock(productsEndpointUrl.origin)
      .get(productsEndpointUrl.pathname)
      .reply(410, {})

    const error = await getError(async () => fetcher(productsEndpoint))

    expect(error).not.toBeInstanceOf(NoErrorThrownError)
    expect(error).toBeInstanceOf(Error)
    expect(error).toHaveProperty('message', 'Gone')
  })

  test('With generic error, Should throw with expected message', async () => {
    nock(productsEndpointUrl.origin)
      .get(productsEndpointUrl.pathname)
      .replyWithError({
        message:
          'invalid json response body at http://bad-url reason: Unexpected end of JSON input',
        type: 'invalid-json',
        stack:
          'FetchError: invalid json response body at http://bad-url reason: Unexpected end of JSON input'
      })

    const error = await getError(async () => fetcher(productsEndpoint))

    expect(error).not.toBeInstanceOf(NoErrorThrownError)
    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(Error)
    expect(error).toHaveProperty(
      'message',
      'request to http://localhost:3049/products failed, reason: invalid json response body at' +
        ' http://bad-url reason: Unexpected end of JSON input'
    )
  })
})
