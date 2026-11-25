/**
 * Home page: one entry per feature; each feature's side navigation lists its examples.
 */
export const homeController = {
  handler(_request, h) {
    return h.view('home/index', {
      pageTitle: 'Home',
      heading: 'CDP Node.js frontend examples'
    })
  }
}
