import { buildErrorDetails } from '#/server/common/helpers/build-error-details.js'
import { sessionNames } from '#/server/common/constants/session-names.js'
import { saveToAnimal } from '../helpers/form/save-to-animal.js'
import { yourDetailsValidation } from '../helpers/schemas/your-details-validation.js'

const yourDetailsController = {
  handler: async (request, h) => {
    const payload = request?.payload

    const validationResult = yourDetailsValidation.validate(payload, {
      abortEarly: false
    })

    if (validationResult?.error) {
      const errorDetails = buildErrorDetails(validationResult.error.details)

      request.yar.flash(sessionNames.validationFailure, {
        formValues: payload,
        formErrors: errorDetails
      })

      return h.redirect('/uploads/multistep-form/add/your-details')
    }

    if (!validationResult.error) {
      await saveToAnimal(request, h, payload)

      return h.redirect('/uploads/multistep-form/add/summary')
    }
  }
}

export { yourDetailsController }
