import { buildOptions } from '~/src/server/common/helpers/options/build-options'

describe('#buildOptions', () => {
  describe('With simple items', () => {
    test('Should provide expected options', () => {
      expect(buildOptions(['yak', 'otter'])).toEqual([
        {
          attributes: {
            selected: true
          },
          disabled: true,
          text: ' - - select - - ',
          value: ''
        },
        {
          text: 'yak',
          value: 'yak'
        },
        {
          text: 'otter',
          value: 'otter'
        }
      ])
    })
  })

  describe('With detailed items', () => {
    test('Should provide expected options', () => {
      expect(
        buildOptions([
          { text: 'Cow', value: 'cow' },
          {
            text: 'Horse',
            value: 'horse'
          }
        ])
      ).toEqual([
        {
          attributes: {
            selected: true
          },
          disabled: true,
          text: ' - - select - - ',
          value: ''
        },
        {
          text: 'Cow',
          value: 'cow'
        },
        {
          text: 'Horse',
          value: 'horse'
        }
      ])
    })
  })

  describe('Without blank option', () => {
    test('Should provide expected options', () => {
      expect(
        buildOptions(
          [
            { text: 'Cow', value: 'cow' },
            {
              text: 'Horse',
              value: 'horse'
            }
          ],
          false
        )
      ).toEqual([
        {
          text: 'Cow',
          value: 'cow'
        },
        {
          text: 'Horse',
          value: 'horse'
        }
      ])
    })
  })
})
