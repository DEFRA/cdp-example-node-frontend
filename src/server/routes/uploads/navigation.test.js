import { buildUploadsNavigation, uploadExamples } from './navigation.js'

describe('#buildUploadsNavigation', () => {
  test('Should list every example', () => {
    expect(
      buildUploadsNavigation({ path: '/uploads' }).map((item) => item.href)
    ).toEqual(uploadExamples.map((example) => example.href))
  })

  test('Should mark the example entry page as current', () => {
    const item = buildUploadsNavigation({
      path: '/uploads/multiple-files'
    }).find((navItem) => navItem.current)

    expect(item).toEqual({
      text: 'Multiple files',
      href: '/uploads/multiple-files',
      current: true,
      active: false
    })
  })

  test('Should mark the example as active for its nested pages', () => {
    const items = buildUploadsNavigation({
      path: '/uploads/multistep-form/add/details'
    })

    expect(items.filter((item) => item.active)).toEqual([
      {
        text: 'In a multistep form',
        href: '/uploads/multistep-form',
        current: false,
        active: true
      }
    ])
  })

  test('Should mark nothing outside /uploads', () => {
    expect(
      buildUploadsNavigation({ path: '/' }).some(
        (item) => item.current || item.active
      )
    ).toBe(false)
  })
})
