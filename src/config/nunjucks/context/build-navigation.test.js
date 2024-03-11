import {
  buildNavigation,
  generatePath
} from '~/src/config/nunjucks/context/build-navigation'

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

describe('#prefixer', () => {
  test('Should return / when prefix is empty and request path is empty', () => {
    expect(generatePath('', '')).toEqual('/')
  })
  test('Should return / when prefix is empty and request path is /', () => {
    expect(generatePath('/', '')).toEqual('/')
  })
  test('Should return /about when prefix is empty and request path is /about', () => {
    expect(generatePath('/about', '')).toEqual('/about')
  })
  test('Should return / when prefix is / and request path is empty', () => {
    expect(generatePath('', '/')).toEqual('/')
  })
  test('Should return / when prefix is / and request path is /', () => {
    expect(generatePath('/', '/')).toEqual('/')
  })
  test('Should return /about when prefix is / and request path is /about', () => {
    expect(generatePath('/about', '/')).toEqual('/about')
  })
  test('Should return /prefix when prefix is /prefix and request path is empty', () => {
    expect(generatePath('', '/prefix')).toEqual('/prefix')
  })
  test('Should return /prefix when prefix is /prefix and request path is /', () => {
    expect(generatePath('/', '/prefix')).toEqual('/prefix')
  })
  test('Should return /prefix/about when prefix is /prefix and request path is /about', () => {
    expect(generatePath('/about', '/prefix')).toEqual('/prefix/about')
  })
})
