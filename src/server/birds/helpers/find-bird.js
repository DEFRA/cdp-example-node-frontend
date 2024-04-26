import { birds } from '~/src/server/birds/data/birds'

function findBirdById(birdId) {
  return birds.find((bird) => bird.birdId === birdId)
}

function findBirdByName(name) {
  return birds.find((bird) => bird.name.toLowerCase === name.toLowerCase)
}

function findAllBirdIds() {
  return birds.map((bird) => bird.birdId)
}

export { findBirdById, findBirdByName, findAllBirdIds }
