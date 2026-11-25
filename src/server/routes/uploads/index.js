import { basicUpload } from './basic/index.js'
import { animals } from './multistep-form/index.js'
import { creatures } from './multiple-files/index.js'
import { plants } from './add-another/index.js'
import { birds } from './async-callbacks/index.js'
import { files } from './common/files/index.js'
import { legacyRedirects } from './legacy-redirects.js'

/**
 * File upload examples, all using cdp-uploader. Each example is its own plugin under /uploads/<example>; the side
 * navigation lists them (see ./navigation.js). There is no landing page: the side navigation is the index, so
 * /uploads opens the first example.
 */
const uploads = {
  plugin: {
    name: 'uploads',
    async register(server) {
      server.route({
        method: 'GET',
        path: '/uploads',
        handler(_request, h) {
          return h.redirect('/uploads/basic')
        }
      })

      await server.register([
        basicUpload,
        animals,
        creatures,
        plants,
        birds,
        files,
        legacyRedirects
      ])
    }
  }
}

export { uploads }
