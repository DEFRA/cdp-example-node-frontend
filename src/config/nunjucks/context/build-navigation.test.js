import { buildNavigation } from '~/src/config/nunjucks/context/build-navigation'

const mockRequest = ({ path = '' } = {}) => ({
  path
})

describe('#buildNavigation', () => {
  test('Should provide expected highlighted navigation details', () => {
    expect(buildNavigation(mockRequest({ path: '/' }))).toEqual([
      {
        isActive: true,
        text: 'Home',
        url: '/'
      },
      {
        isActive: false,
        text: 'About',
        url: '/about'
      },
      {
        isActive: false,
        text: 'Third',
        url: '/third'
      }
    ])
  })
})
