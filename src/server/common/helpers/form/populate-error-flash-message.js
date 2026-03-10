import { sessionNames } from '../../constants/session-names.js'

const populateErrorFlashMessage = (request) => (message) =>
  request.yar.flash(sessionNames.validationFailure, {
    formErrors: { file: { message } }
  })

export { populateErrorFlashMessage }
