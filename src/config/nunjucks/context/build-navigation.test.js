import { buildNavigation } from './build-navigation.js'

function mockRequest(options) {
  return { ...options }
}

function expectedNavigation(currentHref) {
  return [
    { text: 'Home', href: '/' },
    { text: 'File uploads', href: '/uploads' }
  ].map((item) => ({ ...item, current: item.href === currentHref }))
}

describe('#buildNavigation', () => {
  test('Should provide expected navigation details', () => {
    expect(
      buildNavigation(mockRequest({ path: '/non-existent-path' }))
    ).toEqual(expectedNavigation())
  })

  test('Should provide expected highlighted navigation details', () => {
    expect(buildNavigation(mockRequest({ path: '/' }))).toEqual(
      expectedNavigation('/')
    )
  })

  test('Should highlight a section for its nested paths', () => {
    expect(
      buildNavigation(mockRequest({ path: '/uploads/multistep-form/add/kind' }))
    ).toEqual(expectedNavigation('/uploads'))
  })

  test('Should not highlight a section for a path that only shares its prefix', () => {
    expect(buildNavigation(mockRequest({ path: '/uploadsxyz' }))).toEqual(
      expectedNavigation()
    )
  })
})
