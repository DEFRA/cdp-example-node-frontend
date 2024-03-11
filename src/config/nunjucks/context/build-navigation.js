import { sanitisePath } from 'src/helpers/sanitise-url-path.js'

function buildNavigation(request) {
  return [
    {
      text: 'Home',
      url: sanitisePath('/'),
      isActive: request.path === sanitisePath('/')
    },
    {
      text: 'About',
      url: sanitisePath('/about'),
      isActive: request.path === sanitisePath('/about')
    },
    {
      text: 'Third',
      url: sanitisePath('/third'),
      isActive: request.path === sanitisePath('/third')
    }
  ]
}

export { buildNavigation }
