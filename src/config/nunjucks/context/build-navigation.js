function buildNavigation(request) {
  return [
    {
      text: 'Home',
      url: '/',
      isActive: request.path === '/'
    },
    {
      text: 'Basic Upload',
      url: '/basic',
      isActive: request.path.startsWith('/basic')
    },
    {
      text: 'Animals',
      url: '/animals',
      isActive: request.path.startsWith('/animals')
    },
    {
      text: 'Creatures',
      url: '/creatures',
      isActive: request.path.startsWith('/creatures')
    },
    {
      text: 'Plants',
      url: '/plants',
      isActive: request.path.startsWith('/plants')
    },
    {
      text: 'Birds',
      url: '/birds',
      isActive: request.path.startsWith('/birds')
    }
  ]
}

export { buildNavigation }
