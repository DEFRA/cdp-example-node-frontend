import { listBirdsController } from '~/src/server/birds/controllers/list-birds'
import { listTrackingController } from '~/src/server/birds/controllers/tracking/list-tracking'
import { createTrackingController } from '~/src/server/birds/controllers/tracking/create-tracking'
import { createBirdTrackingController } from '~/src/server/birds/controllers/tracking/create-bird-tracking'
import { newTrackingController } from '~/src/server/birds/controllers/tracking/new-tracking'
import { newBirdTrackingController } from '~/src/server/birds/controllers/tracking/new-bird-tracking'
import { processStatusController } from '~/src/server/birds/controllers/tracking/process-status'
import { showTrackingUploadController } from '~/src/server/birds/controllers/tracking/upload-tracking'
import { showTrackingController } from '~/src/server/birds/controllers/tracking/show-tracking'
import { trackingUploadedController } from '~/src/server/birds/controllers/tracking/tracking-uploaded'

export {
  createTrackingController,
  createBirdTrackingController,
  listTrackingController,
  listBirdsController,
  newTrackingController,
  newBirdTrackingController,
  processStatusController,
  showTrackingController,
  showTrackingUploadController,
  trackingUploadedController
}
