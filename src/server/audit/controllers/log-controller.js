export const logController = {
  handler: async (request, h) => {
    const sizeInKB = request.query.size ?? 100
    const fill = request.query.fill ?? 'A'
    const sizeInBytes = 1024 * sizeInKB
    const largeString = Buffer.alloc(sizeInBytes, fill).toString()
    request.logger.info(largeString)
    return h
      .response(
        `wrote log line of ${largeString.length} bytes (${sizeInKB}kb, fill ${fill})`
      )
      .code(200)
  }
}
