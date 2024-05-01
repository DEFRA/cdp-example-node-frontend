const callbackController = {
  handler: (request, h) => {
    request.logger.info(request?.payload, 'Callback endpoint called for animal')

    return request?.payload ?? {}
  }
}

export { callbackController }
