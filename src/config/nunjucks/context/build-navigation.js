export function buildNavigation(request) {
  return [
    {
      text: 'Home',
      href: '/',
      current: request?.path === '/'
    },
    {
      text: 'Basic Upload',
      href: '/basic',
      current: request?.path?.startsWith('/basic') ?? false
    },
    {
      text: 'Animals',
      href: '/animals',
      current: request?.path?.startsWith('/animals') ?? false
    },
    {
      text: 'Creatures',
      href: '/creatures',
      current: request?.path?.startsWith('/creatures') ?? false
    },
    {
      text: 'Plants',
      href: '/plants',
      current: request?.path?.startsWith('/plants') ?? false
    },
    {
      text: 'Birds',
      href: '/birds',
      current: request?.path?.startsWith('/birds') ?? false
    }
  ]
}
