import pino from 'pino'
import { loggerDestination } from '~/src/server/common/helpers/logging/logger-options'

export const auditController = {
  handler: async (request, h) => {
    const sizeInKB = request.query.size ?? 100
    const log = request.query.log ?? 'pino'
    const fill = request.query.fill ?? 'A'

    request.logger.info(`Auditing payload of ${sizeInKB} KB`)
    const kb = fill.repeat(1024 / fill.length)
    const auditPayload = {
      foo: []
    }

    for (let i = 0; i < sizeInKB; i++) {
      auditPayload.foo.push(kb)
    }

    if (log === 'pino') {
      audit(auditPayload)
    } else if (log === 'stdout' || log === 'console') {
      auditPayload['log.level'] = 'audit'
      process.stdout.write(JSON.stringify(auditPayload) + '\n')
    } else if (log === 'shared') {
      sharedAuditLogger.audit(auditPayload)
    } else if (log === 'sync') {
      syncAuditLogger.audit(auditPayload)
    }

    return h.response(`Auditing payload of ${sizeInKB} kb`).code(200)
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

const sharedAuditLogger = pino(auditLoggerConfig, loggerDestination)

const auditLogger = pino(auditLoggerConfig)

const syncDest = pino.destination({ fd: 1, sync: true })
const syncAuditLogger = pino(auditLoggerConfig, syncDest)

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
