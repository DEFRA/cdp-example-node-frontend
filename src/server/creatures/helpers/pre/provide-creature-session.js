const provideCreatureSession = {
  method: async (request, h) =>
    await request.redis.getData(request.params.creatureId),
  assign: 'creatureSession'
}

export { provideCreatureSession }
