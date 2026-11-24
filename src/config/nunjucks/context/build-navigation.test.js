import { buildNavigation } from './build-navigation.js'

function mockRequest(options) {
  return { ...options }
}

function expectedNavigation(currentHref) {
  return [
    { text: 'Home', href: '/' },
    { text: 'Basic Upload', href: '/basic' },
    { text: 'Animals', href: '/animals' },
    { text: 'Creatures', href: '/creatures' },
    { text: 'Plants', href: '/plants' },
    { text: 'Birds', href: '/birds' }
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
    expect(buildNavigation(mockRequest({ path: '/animals/add/kind' }))).toEqual(
      expectedNavigation('/animals')
    )
  })
})
