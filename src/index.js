require('webrtc-adapter')
const React = require('react')
const dataURLToBlob = require('./dataURLToBlob')
const consoleErrors = require('./consoleErrors')

const VIDEO_MIME_TYPE = 'video/webm;codecs=vp8'

const DEFAULT_CONSTRAINTS = {
  audio: false,
  video: {
    facingMode: 'user'
  }
}

const withGetUserMedia = (HOCProps = {}) => Component => {
  class GetUserMedia extends React.Component {
    constructor (props) {
      super(props)

      Object.assign(this, {
        stopStream: this.stopStream.bind(this),
        getUserMedia: this.getUserMedia.bind(this),
        takePhoto: this.takePhoto.bind(this),
        handleGrantedPermissions: this.handleGrantedPermissions.bind(this),
        handleDeniedPermissions: this.handleDeniedPermissions.bind(this),

        startRecording: this.startRecording.bind(this),
        stopRecording: this.stopRecording.bind(this),
        createMediaObjectURL: this.createMediaObjectURL.bind(this),
        createMediaRecorder: this.createMediaRecorder.bind(this),

        constraints: HOCProps.constraints || DEFAULT_CONSTRAINTS,

        state: {
          recording: false,
          permitted: false,
          asked: false
        }
      })
    }

    componentWillUnmount () {
      this.stopStream()
    }

    get streamElement () {
      if (this.streamElementNode) return this.streamElementNode

      const streamElementNode = document.getElementById(HOCProps.streamElementId)

      streamElementNode.setAttribute('autoPlay', true)
      streamElementNode.setAttribute('playsInline', true)

      this.streamElementNode = streamElementNode

      return streamElementNode
    }

    stopStream () {
      if (!this.stream) return consoleErrors.missingStream('stopStream')

      this.stream.getTracks().forEach(track => track.stop())
      this.stream = null
      this.setState({ recording: false })
    }

    getUserMedia () {
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(this.handleGrantedPermissions)
        .catch(this.handleDeniedPermissions)
    }

    handleDeniedPermissions (error) {
      if (this.state.asked) return
      this.setState({ permitted: false, asked: true })
      // TODO: Provide a better way to debug
      console.error(error)
    }

    handleGrantedPermissions (stream) {
      this.stream = stream
      this.setState({ permitted: true, asked: true })

      this.toggleStreamSrcObject()
    }

    createMediaRecorder (stream) {
      if (!window.MediaRecorder) {
        const AudioRecorder = require('audio-recorder-polyfill')
        return new AudioRecorder(stream)
      }

      if (!this.constraints.video) {
        return new window.MediaRecorder(stream)
      }

      return new window.MediaRecorder(stream, { mimeType: VIDEO_MIME_TYPE })
    }

    createMediaObjectURL ({ data }) {
      if (!data || data.size <= 0) return

      if (data.type !== VIDEO_MIME_TYPE) {
        return this.setState({ recordedMedia: URL.createObjectURL(data) })
      }

      const videoBlob = new Blob([data], { type: 'video/webm' })
      const recordedMedia = URL.createObjectURL(videoBlob)
      return this.setState({ recordedMedia })
    }

    startRecording () {
      if (!this.stream) return consoleErrors.missingStream('startRecording')

      this.mediaRecorder = this.createMediaRecorder(this.stream)
      this.mediaRecorder.addEventListener('dataavailable', this.createMediaObjectURL)
      this.mediaRecorder.start()
      this.setState({ recording: true })
    }

    stopRecording () {
      this.mediaRecorder.stop()
      this.setState({ recording: false })
    }

    takePhoto () {
      if (!this.stream) return consoleErrors.missingStream('takePhoto')
      if (!this.streamElement) return consoleErrors.elementNotFound('streamElementId')

      const { videoWidth, videoHeight } = this.streamElement
      const canvasElement = document.createElement('canvas')
      canvasElement.height = videoHeight
      canvasElement.width = videoWidth
      canvasElement.getContext('2d').drawImage(this.streamElement, 0, 0)

      const photo = canvasElement.toDataURL('image/png')
      const photoBlob = dataURLToBlob(photo)

      this.setState({ photo, photoBlob })
    }

    toggleStreamSrcObject () {
      if (!HOCProps.streamElementId) return
      if (!this.streamElement) return consoleErrors.elementNotFound('streamElementId')

      if (!this.stream) {
        this.streamElement.srcObject = null
      }

      this.streamElement.srcObject = this.stream
    }

    render () {
      return (
        <Component
          stopStream={this.stopStream}
          getUserMedia={this.getUserMedia}
          takePhoto={this.takePhoto}
          startRecording={this.startRecording}
          stopRecording={this.stopRecording}
          stream={this.stream}
          {...HOCProps}
          {...this.state}
          {...this.props}
        />
      )
    }
  }

  const displayName = Component.displayName || Component.name || 'Component'
  GetUserMedia.displayName = `withGetUserMedia(${displayName})`
  return GetUserMedia
}

withGetUserMedia.version = React.version

module.exports = { withGetUserMedia }
