import { config } from '~/src/config'

const appPathPrefix = config.get('appPathPrefix')

function buildNavigation(request) {
  return [
    {
      text: 'Home',
      url: generatePath('/'),
      isActive: request.path === generatePath('/')
    },
    {
      text: 'About',
      url: generatePath('/about'),
      isActive: request.path === generatePath('/about')
    },
    {
      text: 'Third',
      url: generatePath('/third'),
      isActive: request.path === generatePath('/third')
    }
  ]
}

function generatePath(requestPath, prefix = appPathPrefix) {
  const path = `${prefix}${requestPath}`
  if (path === '' || path === '/') {
    return '/'
  } else if (path.startsWith('//')) {
    return requestPath
  } else if (requestPath === '/') {
    return prefix
  } else {
    return path
  }
}

export { buildNavigation, generatePath }
