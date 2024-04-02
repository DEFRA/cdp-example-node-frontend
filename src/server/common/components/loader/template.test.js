import { renderTestComponent } from '~/test-helpers/component-helpers'

describe('Loader Component', () => {
  let $buttonLoader

  beforeEach(() => {
    $buttonLoader = renderTestComponent('loader', {
      name: 'button-loader'
    })('[data-testid="app-loader"]').first()
  })

  test('Should render loader', () => {
    expect($buttonLoader.length).toEqual(1)
  })
})
