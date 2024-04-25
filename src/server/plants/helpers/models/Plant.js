// TODO not convinced on this. Might just be simpler to put a constructed fileUrl into the db in the first place
class Plant {
  constructor(plant) {
    this.plantId = plant.plantId
    this.name = plant.name
    this.files = plant.files
    this.createdAt = plant.createdAt
    this.updatedAt = plant.updatedAt
  }

  get fileUrls() {
    return this.files.map(this.fileUrl)
  }

  fileUrl({ uploadId, fileId }) {
    return '/file/' + uploadId + '/' + fileId
  }
}

export { Plant }
