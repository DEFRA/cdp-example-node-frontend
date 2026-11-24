import { load } from 'cheerio'

import { createServer } from '#/server/server.js'
import { statusCodes } from '#/server/common/constants/status-codes.js'

describe('#uploads', () => {
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('Should open the first example from /uploads', async () => {
    const { headers, statusCode } = await server.inject({
      method: 'GET',
      url: '/uploads'
    })

    expect(statusCode).toBe(statusCodes.found)
    expect(headers.location).toBe('/uploads/basic')
  })

  test('Should show the side navigation and File uploads tab on an example', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/uploads/basic'
    })
    const $ = load(result)

    expect(statusCode).toBe(statusCodes.ok)
    expect($('[data-testid="app-side-navigation-item"]')).toHaveLength(5)
    expect($('.govuk-service-navigation__item--active').text().trim()).toBe(
      'File uploads'
    )
  })

  test.each([
    ['/basic', '/uploads/basic'],
    ['/animals', '/uploads/multistep-form'],
    ['/animals/add/details', '/uploads/multistep-form/add/details'],
    ['/creatures/123/upload', '/uploads/multiple-files/123/upload'],
    ['/plants/add?x=1', '/uploads/add-another/add?x=1'],
    ['/birds/1/tracking/spotter', '/uploads/async-callbacks/1/tracking/spotter']
  ])('Should permanently redirect %s to %s', async (url, location) => {
    const { headers, statusCode } = await server.inject({ method: 'GET', url })

    expect(statusCode).toBe(statusCodes.movedPermanently)
    expect(headers.location).toBe(location)
  })
})
