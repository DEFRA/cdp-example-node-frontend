import { renderComponent } from '#/test-helpers/component-helpers.js'

describe('Side Navigation Component', () => {
  let $nav

  beforeEach(() => {
    $nav = renderComponent('side-navigation', {
      heading: 'File uploads',
      items: [
        { text: 'Basic', href: '/uploads/basic', current: true },
        {
          text: 'Multiple files',
          href: '/uploads/multiple-files',
          active: true
        },
        { text: 'Async callbacks', href: '/uploads/async-callbacks' }
      ]
    })
  })

  test('Should render a labelled navigation landmark', () => {
    const $sideNav = $nav('[data-testid="app-side-navigation"]')

    expect($sideNav.prop('tagName')).toBe('NAV')
    expect($sideNav.attr('aria-label')).toBe('File uploads')
  })

  test('Should render the heading', () => {
    expect(
      $nav('[data-testid="app-side-navigation-heading"]').text().trim()
    ).toBe('File uploads')
  })

  test('Should render expected items', () => {
    expect($nav('[data-testid="app-side-navigation-item"]')).toHaveLength(3)
  })

  test('Should mark the current page and the active section', () => {
    const $items = $nav('[data-testid="app-side-navigation-item"]')

    expect($items.eq(0).hasClass('app-side-navigation__item--current')).toBe(
      true
    )
    expect($items.eq(0).find('a').attr('aria-current')).toBe('page')
    expect($items.eq(1).hasClass('app-side-navigation__item--current')).toBe(
      true
    )
    expect($items.eq(1).find('a').attr('aria-current')).toBe('true')
    expect($items.eq(2).hasClass('app-side-navigation__item--current')).toBe(
      false
    )
    expect($items.eq(2).find('a').attr('aria-current')).toBeUndefined()
  })
})
