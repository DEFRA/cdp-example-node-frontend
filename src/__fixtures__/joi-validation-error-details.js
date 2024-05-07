const joiValidationErrorDetailsFixture = [
  {
    message: 'Choose an entry',
    path: ['imageName'],
    type: 'any.only',
    context: {
      valids: [
        'cdp-node-frontend-template',
        'cdp-portal-frontend',
        'cdp-teams-and-repositories'
      ],
      label: 'imageName',
      value: '',
      key: 'imageName'
    }
  },
  {
    message: '"imageName" is not allowed to be empty',
    path: ['imageName'],
    type: 'string.empty',
    context: {
      label: 'imageName',
      value: '',
      key: 'imageName'
    }
  },
  {
    message: 'Choose an entry',
    path: ['version'],
    type: 'string.empty',
    context: {
      label: 'version',
      value: '',
      key: 'version'
    }
  },
  {
    message: 'Choose an entry',
    path: ['environment'],
    type: 'any.only',
    context: {
      valids: ['development', 'test', 'perftest', 'production'],
      label: 'environment',
      value: '',
      key: 'environment'
    }
  },
  {
    message: '"environment" is not allowed to be empty',
    path: ['environment'],
    type: 'string.empty',
    context: {
      label: 'environment',
      value: '',
      key: 'environment'
    }
  },
  {
    message: "'Day' should be a number",
    path: ['date', 'day'],
    type: 'number.base',
    context: {
      label: 'date.day',
      value: '',
      key: 'day'
    }
  },
  {
    message: "'Month' should be 1 or above",
    path: ['date', 'month'],
    type: 'number.base',
    context: {
      label: 'date.month',
      value: '',
      key: 'month'
    }
  },
  {
    message: "'Year' should be a number",
    path: ['date', 'year'],
    type: 'number.base',
    context: {
      label: 'date.year',
      value: '',
      key: 'year'
    }
  }
]

export { joiValidationErrorDetailsFixture }
