import { config } from '~/src/config'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher'

const backendUrl = config.get('cdpExampleNodeBackendUrl')

function birdPath(bird, path) {
  return `${backendUrl}/birds/${bird.birdId}${path}`
}

async function birdPost(bird, path, body) {
  const endpoint = trackingPath(bird, path)
  const { json } = await fetcher(endpoint, {
    method: 'post',
    body: JSON.stringify(body)
  })
  return json
}

export { birdPath, birdPost }
