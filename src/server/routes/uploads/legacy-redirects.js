/**
 * The upload examples used to live at the top level (/animals, /creatures…). Permanently redirect those URLs so old
 * bookmarks and links in docs keep working. Only GET: in-flight form posts to the old URLs are not worth supporting.
 */
const legacyPrefixes = {
  '/basic': '/uploads/basic',
  '/animals': '/uploads/multistep-form',
  '/creatures': '/uploads/multiple-files',
  '/plants': '/uploads/add-another',
  '/birds': '/uploads/async-callbacks'
}

const legacyRedirects = {
  plugin: {
    name: 'uploads-legacy-redirects',
    register(server) {
      server.route(
        Object.entries(legacyPrefixes).map(([oldPrefix, newPrefix]) => ({
          method: 'GET',
          path: `${oldPrefix}/{path*}`,
          handler(request, h) {
            const path = request.params.path ? `/${request.params.path}` : ''

            return h
              .redirect(`${newPrefix}${path}${request.url.search}`)
              .permanent()
          }
        }))
      )
    }
  }
}

export { legacyRedirects }
