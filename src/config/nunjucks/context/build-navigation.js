function buildNavigation(request) {
  return [
    {
      text: 'Home',
      url: '/',
      isActive: request.path === '/'
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
    }
  ]
}

export { buildNavigation }
