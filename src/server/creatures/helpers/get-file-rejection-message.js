function getFileRejectionMessage(fileField) {
  const files = Array.isArray(fileField) ? fileField : [fileField]
  const withErrors = files
    .map((file) => {
      if (file.hasError) {
        // TODO maybe move this into the cdp-uploader?
        return `${file.errorMessage} - ${file.filename}`
      }
      return false
    })
    .filter(Boolean)
  return withErrors.join(', ')
}

export { getFileRejectionMessage }
