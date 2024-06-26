import { uploadFormController } from '~/src/server/animals/controllers/upload-form'
import { animalListController } from '~/src/server/animals/controllers/list'
import { animalController } from '~/src/server/animals/controllers/animal'
import { startController } from '~/src/server/animals/controllers/start'
import { detailsFormController } from '~/src/server/animals/controllers/details-form'
import { detailsController } from '~/src/server/animals/controllers/details'
import { kindFormController } from '~/src/server/animals/controllers/kind-form'
import { kindController } from '~/src/server/animals/controllers/kind'
import { yourDetailsFormController } from '~/src/server/animals/controllers/your-details-form'
import { yourDetailsController } from '~/src/server/animals/controllers/your-details'
import { summaryFormController } from '~/src/server/animals/controllers/summary-form'
import { createController } from '~/src/server/animals/controllers/create'
import { uploadStatusPollerController } from '~/src/server/animals/controllers/upload-status-poller'

export {
  startController,
  detailsFormController,
  detailsController,
  kindFormController,
  kindController,
  yourDetailsFormController,
  yourDetailsController,
  uploadFormController,
  summaryFormController,
  createController,
  animalListController,
  animalController,
  uploadStatusPollerController
}
