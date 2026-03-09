export function buildNavigation(request) {
  return [
    {
      text: 'Home',
      href: '/',
      current: request.path === '/'
    },
    {
      text: 'Basic Upload',
      href: '/basic',
      current: request.path.startsWith('/basic')
    },
    {
      text: 'Animals',
      href: '/animals',
      current: request.path.startsWith('/animals')
    },
    {
      text: 'Creatures',
      href: '/creatures',
      current: request.path.startsWith('/creatures')
    },
    {
      text: 'Plants',
      href: '/plants',
      current: request.path.startsWith('/plants')
    },
    {
      text: 'Birds',
      href: '/birds',
      current: request.path.startsWith('/birds')
    }
  ]
}
