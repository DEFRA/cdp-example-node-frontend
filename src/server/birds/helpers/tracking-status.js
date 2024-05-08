function isStatus(statuses, status) {
  return statuses.map((s) => s.toLowerCase()).includes(status.toLowerCase())
}

function isStatusProcessing(status) {
  return isStatus(['uploadpending', 'readyforprocessing', 'processing'], status)
}

function isStatusReady(status) {
  return isStatus(['ready'], status)
}

function isStatusRejected(status) {
  return isStatus(['rejected', 'failed'], status)
}

export { isStatusProcessing, isStatusReady, isStatusRejected }
