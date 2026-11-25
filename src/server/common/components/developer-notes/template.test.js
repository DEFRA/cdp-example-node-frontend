import { renderComponent } from '#/test-helpers/component-helpers.js'

describe('Developer Notes Component', () => {
  let $notes

  describe('With all params', () => {
    beforeEach(() => {
      $notes = renderComponent('developer-notes', {
        sections: [
          {
            heading: 'Before this page',
            items: [
              'Started a session.',
              { html: 'Called <code>/initiate</code>.' }
            ]
          },
          {
            heading: 'When you press Upload',
            items: ['The browser posts to cdp-uploader.'],
            html: '<pre class="extra">{ redirect: "/next" }</pre>'
          }
        ],
        payload: '{ uploadUrl: /upload-and-scan/123 }',
        code: 'src/server/routes/uploads/basic/controllers/basic-upload-form.js',
        docs: {
          text: 'cdp-uploader POST /initiate',
          href: 'https://github.com/DEFRA/cdp-uploader?tab=readme-ov-file#post-initiate'
        }
      })
    })

    test('Should render the notes collapsed in a details component', () => {
      const $details = $notes('[data-testid="app-developer-notes"]')

      expect($details).toHaveLength(1)
      expect($details.is('details.govuk-details')).toBe(true)
      expect($details.attr('open')).toBeUndefined()
      expect($notes('.govuk-details__summary-text').text().trim()).toBe(
        'Developer notes: what happens behind the scenes'
      )
    })

    test('Should render each section heading in order', () => {
      const headings = $notes('[data-testid="app-developer-notes-heading"]')
        .map((_i, el) => $notes(el).text().trim())
        .get()

      expect(headings).toEqual(['Before this page', 'When you press Upload'])
    })

    test('Should escape text items and keep html items', () => {
      const $firstList = $notes(
        '[data-testid="app-developer-notes-list"]'
      ).first()

      expect($firstList.find('li').first().text().trim()).toBe(
        'Started a session.'
      )
      expect($firstList.find('li code').text()).toBe('/initiate')
    })

    test('Should render section html', () => {
      expect($notes('pre.extra').text()).toBe('{ redirect: "/next" }')
    })

    test('Should render the payload', () => {
      expect($notes('[data-testid="app-developer-notes-payload"]').text()).toBe(
        '{ uploadUrl: /upload-and-scan/123 }'
      )
    })

    test('Should link to the code on GitHub', () => {
      const $code = $notes('[data-testid="app-developer-notes-code"]')

      expect($code.attr('href')).toBe(
        'https://github.com/DEFRA/cdp-example-node-frontend/blob/main/src/server/routes/uploads/basic/controllers/basic-upload-form.js'
      )
      expect($code.text().trim()).toBe(
        'uploads/basic/controllers/basic-upload-form.js'
      )
    })

    test('Should link to the docs', () => {
      const $docs = $notes('[data-testid="app-developer-notes-docs"]')

      expect($docs.attr('href')).toBe(
        'https://github.com/DEFRA/cdp-uploader?tab=readme-ov-file#post-initiate'
      )
      expect($docs.text().trim()).toBe('cdp-uploader POST /initiate')
    })
  })

  describe('With several code paths and no optional params', () => {
    beforeEach(() => {
      $notes = renderComponent('developer-notes', {
        sections: [{ heading: 'What happens next', items: ['Nothing.'] }],
        code: ['src/a.js', 'src/b.js']
      })
    })

    test('Should link to each code path', () => {
      expect($notes('[data-testid="app-developer-notes-code"]')).toHaveLength(2)
    })

    test('Should not render a payload or docs link', () => {
      expect(
        $notes('[data-testid="app-developer-notes-payload"]')
      ).toHaveLength(0)
      expect($notes('[data-testid="app-developer-notes-docs"]')).toHaveLength(0)
    })
  })
})
