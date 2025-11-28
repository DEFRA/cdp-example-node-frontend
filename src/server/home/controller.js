const serverExtensionPoint = (extName) => (request, h) => {
  request.logger.info(`Call from ${extName} extension point`)

  return h.continue
}

const homeController = {
  options: {
    ext: {
      onPreAuth: { method: serverExtensionPoint('onPreAuth') },
      onPostAuth: { method: serverExtensionPoint('onPostAuth') },
      onPreHandler: { method: serverExtensionPoint('onPreHandler') },
      onPostHandler: { method: serverExtensionPoint('onPostHandler') },
      onPreResponse: { method: serverExtensionPoint('onPreResponse') }
    }
  },
  handler: (request, h) => {
    request.logger.info('Handling home route request')

    return h.view('home/index', {
      pageTitle: 'Home',
      heading: 'Home'
    })
  }
}

export { homeController }
