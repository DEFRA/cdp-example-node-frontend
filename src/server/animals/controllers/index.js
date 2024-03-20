import { uploadFormController } from '~/src/server/animals/controllers/upload-form'
import { uploadSuccessController } from '~/src/server/animals/controllers/upload-success'
import { uploadFailureController } from '~/src/server/animals/controllers/upload-failure'
import { animalListController } from '~/src/server/animals/controllers/list'
import { animalController } from '~/src/server/animals/controllers/animal'
import { startController } from '~/src/server/animals/controllers/start'
import { detailsFormController } from '~/src/server/animals/controllers/details-form'
import { detailsController } from '~/src/server/animals/controllers/details'
import { kindFormController } from '~/src/server/animals/controllers/kind-form'
import { kindController } from '~/src/server/animals/controllers/kind'
import { yourDetailsFormController } from '~/src/server/animals/controllers/your-details-form'
import { yourDetailsController } from '~/src/server/animals/controllers/your-details'

export {
  startController,
  detailsFormController,
  detailsController,
  kindFormController,
  kindController,
  yourDetailsFormController,
  yourDetailsController,
  uploadFormController,
  uploadSuccessController,
  uploadFailureController,
  animalListController,
  animalController
}
