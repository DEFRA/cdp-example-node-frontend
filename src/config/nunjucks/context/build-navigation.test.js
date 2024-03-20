import { buildNavigation } from '~/src/config/nunjucks/context/build-navigation'

const mockRequest = ({ path } = {}) => ({
  path
})

describe('#buildNavigation', () => {
  test('Should provide expected highlighted navigation details', async () => {
    expect(buildNavigation(mockRequest({ path: '/' }))).toEqual([
      {
        isActive: true,
        text: 'Home',
        url: '/'
      },
      {
        isActive: false,
        text: 'Animals',
        url: '/animals'
      },
      {
        isActive: false,
        text: 'Creatures',
        url: '/creatures'
      }
    ])
  })
})
