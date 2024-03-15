function buildNavigation(request) {
  return [
    {
      text: 'Home',
      url: '/',
      isActive: request.path === '/'
    },
    {
      text: 'Creatures',
      url: '/creatures',
      isActive: request.path.startsWith('/creatures')
    }
  ]
}

export { buildNavigation }
