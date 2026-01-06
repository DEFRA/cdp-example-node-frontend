import { audit } from '@defra/cdp-auditing'

export const auditController = {
  handler: async (request, h) => {
    const sizeInBytes = request.query.size ?? 100
    request.logger.info(`Auditing payload of ${sizeInBytes} bytes`)
    audit('A'.repeat(sizeInBytes))
    return h.response(`Auditing payload of ${sizeInBytes} bytes`).code(200)
  }
}
