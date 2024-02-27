import { config } from '~/src/config'

const appPathPrefix = config.get('appPathPrefix')

const withAppPrefix = (path) => {
  const slashed = path && path.startsWith('/') ? path : `/${path}`
  if (!appPathPrefix || appPathPrefix === '/') {
    return slashed
  } else {
    return `${appPathPrefix}${slashed}`
  }
}

export { withAppPrefix }
