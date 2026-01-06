import pino from 'pino'

export const auditController = {
  handler: async (request, h) => {
    const sizeInKB = request.query.size ?? 100
    request.logger.info(`Auditing payload of ${sizeInKB} KB`)
    const kb = 'A'.repeat(1024)
    const auditPayload = {
      foo: []
    }

    for (let i = 0; i < sizeInKB; i++) {
      auditPayload.foo.push(kb)
    }
    audit(auditPayload)
    return h.response(`Auditing payload of ${sizeInKB} bytes`).code(200)
  }
}

const auditLoggerConfig = {
  level: 'audit',
  customLevels: { audit: 999 },
  useOnlyCustomLevels: true,
  timestamp: pino.stdTimeFunctions.isoTime,
  base: null,
  formatters: {
    level(label) {
      return { 'log.level': label.toLowerCase() }
    }
  }
}

const auditLogger = pino(auditLoggerConfig)

if (process.env.CDP_AUDIT_ENABLED === 'false') {
  enableAuditing(false)
}

/**
 * Globally enables or disables auditing
 * @param {boolean|null} isEnabled
 */
function enableAuditing(isEnabled = true) {
  if (isEnabled) {
    auditLogger.level = 'audit'
  } else {
    auditLogger.level = 'silent'
  }
}

/**
 * Writes an audit message to stdout with a `log.level` of `audit`.
 * API is exactly the same as pino's logger api.
 *
 * @param { ...Object|String|Error } args - Either:
 *   - one String
 *   - one Object or Error
 *   - one Object or Error and one String
 */
function audit(...args) {
  auditLogger.audit.apply(auditLogger, args)
}
