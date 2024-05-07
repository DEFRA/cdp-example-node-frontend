function reveal($controller) {
  if (!$controller) {
    return
  }

  const $reveal = document.getElementById($controller.dataset.reveal)
  const showValue = $controller.dataset.revealShow
  const hideValue = $controller.dataset.revealHide

  $controller.addEventListener(
    'change',
    (event) => {
      if (event.target.tagName.toLowerCase() === 'input') {
        if (event.target.value === showValue) {
          $reveal.classList.remove('govuk-!-display-none')
          $reveal.classList.add('govuk-!-display-block')
        }

        if (event.target.value === hideValue) {
          $reveal.classList.remove('govuk-!-display-block')
          $reveal.classList.add('govuk-!-display-none')
        }
      }
    },
    true
  )

  document.addEventListener('DOMContentLoaded', () => {
    const checkedInput = Array.from($controller.querySelectorAll('input')).find(
      (input) => input.checked
    )

    if (checkedInput?.value === showValue) {
      $reveal.classList.remove('govuk-!-display-none')
      $reveal.classList.add('govuk-!-display-block')
    }

    if (checkedInput?.value === hideValue) {
      $reveal.classList.remove('govuk-!-display-block')
      $reveal.classList.add('govuk-!-display-none')
    }
  })
}

export { reveal }
