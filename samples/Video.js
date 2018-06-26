import React from 'react'
import { withGetUserMedia } from '../src/index'

const RecordVideo = ({ getUserMedia, permitted, startRecording, stopRecording, recording, recordedMedia, stopStream, stream }) => {
  function recordFlow () {
    if (!window.MediaRecorder) return null
    if (!permitted || !stream) return getUserMedia()
    if (!recording) return startRecording()
    stopRecording()
  }

  function recordFlowText () {
    if (!window.MediaRecorder) return 'Your browser can\'t record videos'
    if (!permitted || !stream) return 'Grant permissions: video'
    if (!recording) return 'Start Recording'
    return 'Stop Recording'
  }

  return (
    <React.Fragment>
      <h1>Video</h1>
      <div className='buttonBox'>
        <button onClick={recordFlow}>{recordFlowText()}</button>
        <button onClick={stopStream}>Stop Stream</button>
      </div>
      <h3>RecordStatus: {recording ? 'TRUE' : 'FALSE'}</h3>
      <video id='stream' style={{ width: '320px' }} />
      {recordedMedia && <video controls src={recordedMedia} />}
    </React.Fragment>
  )
}

export default withGetUserMedia({
  streamElementId: 'stream',
  constraints: { video: { facingMode: 'user' } }
})(RecordVideo)
