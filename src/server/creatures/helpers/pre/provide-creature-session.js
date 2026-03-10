const provideCreatureSession = {
  method: async (request, h) => request.yar.get(request.params.creatureId),
  assign: 'creatureSession'
}

export { provideCreatureSession }
