import { sessionNames } from '~/src/server/common/constants/session-names'

const populateErrorFlashMessage = (request) => (message) =>
  request.yar.flash(sessionNames.validationFailure, {
    formErrors: { file: { message } }
  })

export { populateErrorFlashMessage }
