function buildErrorMessages(path, value) {
  const object = {}
  path.reduce((obj, item) => (obj[item] = { ...value }), object)

  return object
}

function extractMessage(detail) {
  switch (detail.type) {
    case 'alternatives.match':
      // when alternatives fails it gives its own reason why each match stage failed
      // the actual errors we want (file related) are in the context
      return detail.context.details
        .filter((d) => d.type !== 'object.base')
        .map((d) => d.message)
        .join(' ')
    default:
      return detail.message
  }
}

function buildErrorDetails(errorDetails = []) {
  return errorDetails.reduce((errors, detail) => {
    const errorMessages = buildErrorMessages(detail.path, {
      message: extractMessage(detail)
    })

    return {
      ...errorMessages,
      ...errors
    }
  }, {})
}

export { buildErrorDetails }
