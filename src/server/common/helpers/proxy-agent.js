import { Url } from 'url'
import { HttpsProxyAgent } from 'https-proxy-agent'

import { config } from '~/src/config'

const proxyAgent = () => {
  const httpsProxy = config.get('httpsProxy')

  if (!httpsProxy) {
    return null
  } else {
    const proxyUrl = new Url(httpsProxy)
    return {
      url: proxyUrl,
      agent: new HttpsProxyAgent(proxyUrl)
    }
  }
}

export { proxyAgent }
