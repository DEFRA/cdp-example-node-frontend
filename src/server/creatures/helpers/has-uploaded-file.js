function hasUploadedFile(fileField) {
  return Array.isArray(fileField) || fileField?.contentLength > 0
}

export { hasUploadedFile }
