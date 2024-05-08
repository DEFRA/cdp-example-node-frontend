import Joi from 'joi'

const printableMimeType = (mineType) => {
  const parts = mineType.split('/')
  if (parts.length > 0) {
    return parts[parts.length - 1]
  }
  return mineType
}

const defaultFileName = 'The selected file'

const fileValidator = Joi.extend((joi) => {
  return {
    type: 'file',
    base: joi.object(),
    messages: {
      'file.missing': 'A file is required.',
      'file.empty': '{{#filename}} is empty.',
      'file.size': '{{#filename}} must be smaller than {{#size}}.',
      'file.mimetype': '{{#filename}} must be a {{#mimetypes}}.'
    },
    validate(value, helpers) {
      // Missing file
      if (!value?.filename) {
        return { value, errors: helpers.error('file.missing') }
      }

      const filename = helpers.schema.$_getFlag('showFileName')
        ? value.filename
        : defaultFileName

      // Errors from the uploader
      if (value?.hasError === true) {
        return {
          value,
          errors: helpers.message(
            value?.errorMessage.replace(defaultFileName, filename)
          )
        }
      }

      // Empty file
      if (value?.contentLength === 0) {
        return {
          value,
          errors: helpers.error('file.empty', { filename })
        }
      }
      return { value }
    },
    rules: {
      showFileName: {
        method() {
          return this.$_setFlag('showFileName', true)
        }
      },
      maxSize: {
        method(size) {
          return this.$_addRule({ name: 'maxSize', args: { size } })
        },
        args: [
          {
            name: 'size',
            ref: true,
            assert: (value) => typeof value === 'number' && !isNaN(value),
            message: 'must be a number'
          }
        ],
        validate(value, helpers, args, options) {
          if (value?.contentLength && value?.contentLength > args.size) {
            const filename = helpers.schema.$_getFlag('showFileName')
              ? value.filename
              : defaultFileName

            // TODO: scale the file size to the right unit. Also what unit should the API allow?
            return helpers.error('file.size', {
              filename,
              size: args.size
            })
          }
          return value
        }
      },
      mimeType: {
        method(mimeTypes) {
          return this.$_addRule({ name: 'mimeType', args: { mimeTypes } })
        },
        args: [
          {
            name: 'mimeTypes',
            ref: true,
            assert: (value) =>
              Array.isArray(value) &&
              value.every((v) => typeof v === 'string') &&
              value.length > 0,
            message: 'must be an array of mime types'
          }
        ],
        validate(value, helpers, args, options) {
          if (value?.contentType) {
            const contentType = value?.contentType

            const correctMimeType = args.mimeTypes.some(
              (m) => m.toLowerCase() === contentType.toLowerCase()
            )

            if (!correctMimeType) {
              const validFiles = args.mimeTypes
                .map(printableMimeType)
                .join(', ')

              const filename = helpers.schema.$_getFlag('showFileName')
                ? value.filename
                : defaultFileName

              return helpers.error('file.mimetype', {
                filename,
                mimetypes: validFiles
              })
            }
          }
          return value
        }
      }
    }
  }
})

export { fileValidator }
