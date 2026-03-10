import { sessionToCreature } from './session-to-creature.js'
import { creaturesSessionFixture } from '../../../__fixtures__/creatures-session.js'

describe('#sessionToCreature', () => {
  beforeEach(() => {
    vitest.useFakeTimers('modern')
    vitest.setSystemTime(new Date('2023-05-29'))
  })

  afterAll(() => {
    vitest.useRealTimers()
  })

  test('Should provide expected transformation', () => {
    expect(sessionToCreature(creaturesSessionFixture)).toEqual({
      address: {
        addressLine1: 'Cadbury Lane',
        addressLine2: 'chocolate street',
        postCode: 'OX61RT',
        townOrCity: 'Oxford'
      },
      creatureFiles: [
        {
          fileId: 'aa710148-ae23-4864-ac63-cf4698e4acd7',
          fileUrl:
            '7ca0496d-d7a7-40fc-aef4-2a46d1a9ce00/aa710148-ae23-4864-ac63-cf4698e4acd7',
          filename: 'shoot.jpg'
        }
      ],
      creatureId: 'fedc8e3b-cfd1-4aec-b659-f949f65bedf9',
      date: '2023-05-29T00:00:00.000Z',
      evidenceFiles: [
        {
          fileId: 'e9963130-00cf-48e3-baa4-347670fff937',
          fileUrl:
            '7ca0496d-d7a7-40fc-aef4-2a46d1a9ce00/e9963130-00cf-48e3-baa4-347670fff937',
          filename: 'yak.jpeg'
        }
      ],
      kind: 'leprechaun',
      name: 'HarRy',
      realLifeSighting: true
    })
  })
})
