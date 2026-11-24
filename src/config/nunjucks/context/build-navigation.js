export function buildNavigation(request) {
  return [
    {
      text: 'Home',
      href: '/',
      current: request?.path === '/'
    },
    {
      text: 'File uploads',
      href: '/uploads',
      current:
        request?.path === '/uploads' ||
        (request?.path?.startsWith('/uploads/') ?? false)
    }
  ]
}
