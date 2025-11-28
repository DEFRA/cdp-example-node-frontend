// Mock @defra/hapi-tracing to avoid ES module issues in Jest
jest.mock('@defra/hapi-tracing', () => ({
  getTraceId: jest.fn(() => 'test-trace-id-123'),
  requestTracing: {
    name: 'request-tracing',
    version: '1.0.0',
    register: jest.fn()
  }
}))

global.afterEach(() => {
  // Clear down JSDOM document after each test
  document.getElementsByTagName('html')[0].innerHTML = ''
})
