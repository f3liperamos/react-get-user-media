test("component must have extra props passed into its HOC", function () {
  const React = require('react')
  const { withGetUserMedia } = require('../src/index')
  const enzyme = require('enzyme');

  const SomeComponent = () => <div>Hello World</div>

  const extraProps = ({
    title: 'Hello World',
    itsNot: 'Unusual be loved by anyone'
  })

  const WrappedComponent = withGetUserMedia(extraProps)(SomeComponent)
  const RenderedComponent = enzyme.shallow(<WrappedComponent />)
  const props = RenderedComponent.props()

  const MatchProps = {
    ...extraProps,
    stopStream: expect.any(Function),
    getUserMedia: expect.any(Function),
    takePhoto: expect.any(Function),
    startRecording: expect.any(Function),
    stopRecording: expect.any(Function),
    recording: false,
    permitted: false
  }

  expect(props).toMatchObject(MatchProps)
})

describe('Pending tests', function () {
  // Terrible update from jest. Pending tests needs a skip AND a second argument
  test.skip("navigator.getUserMedia promise fulfilled", () => {}) // Pending: getElementById is failing
  test.skip("navigator.getUserMedia promise reject", () => {}) // Pending: getElementById is failing
  test.skip("startRecording state change", () => {}) // Pending: getElementById is failing
  test.skip("stopRecording state change", () => {}) // Pending: getElementById is failing
  test.skip("stopStream state change", () => {}) // Pending: getElementById is failing
  test.skip("takePhoto state change", () => {}) // Pending: getElementById is failing
})
