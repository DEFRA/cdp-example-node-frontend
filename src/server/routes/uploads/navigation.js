/**
 * The file upload examples, in the order they appear in the side navigation. Kept free of imports so the Nunjucks
 * context can use it without loading the example controllers.
 */
const uploadExamples = [
  {
    text: 'Basic',
    href: '/uploads/basic'
  },
  {
    text: 'In a multistep form',
    href: '/uploads/multistep-form'
  },
  {
    text: 'Multiple files',
    href: '/uploads/multiple-files'
  },
  {
    text: 'Add another file',
    href: '/uploads/add-another'
  },
  {
    text: 'Async callbacks',
    href: '/uploads/async-callbacks'
  }
]

/**
 * Side navigation items for pages under /uploads. Mirrors govukServiceNavigation: `current` marks the example's
 * own entry page, `active` any page inside that example.
 */
function buildUploadsNavigation(request) {
  const path = request?.path ?? ''

  return uploadExamples.map(({ text, href }) => ({
    text,
    href,
    current: path === href,
    active: path.startsWith(`${href}/`)
  }))
}

export { uploadExamples, buildUploadsNavigation }
