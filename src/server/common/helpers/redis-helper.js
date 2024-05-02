class RedisHelper {
  constructor(redis) {
    this.client = redis
  }

  async storeCreatureId(creatureId, uploadId) {
    return await this.client.set(creatureId, JSON.stringify({ uploadId }))
  }

  async findCreatureId(creatureId) {
    const uploadDetails = await this.client.get(creatureId)

    if (uploadDetails) {
      return JSON.parse(uploadDetails)
    }
  }
}

export { RedisHelper }
