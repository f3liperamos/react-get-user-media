import React from 'react'
import { withGetUserMedia } from '../src/index'

const RecordAudio = ({ getUserMedia, permitted, startRecording, stopRecording, recording, mediaObjectURL, stopStream, stream }) => {
  function recordFlow () {
    if (!permitted || !stream) return getUserMedia()
    if (!recording) return startRecording()
    stopRecording()
  }

  function recordFlowText () {
    if (!permitted || !stream) return 'Grant permissions: audio'
    if (!recording) return 'Start Recording'
    return 'Stop Recording'
  }

  return (
    <React.Fragment>
      <h1>Audio</h1>
      <div className='buttonBox'>
        <button onClick={recordFlow}>{recordFlowText()}</button>
        <button onClick={stopStream}>Stop Stream</button>
      </div>
      <h3>RecordStatus: {recording ? 'TRUE' : 'FALSE'}</h3>
      <audio id='audioId' controls src={mediaObjectURL} />
    </React.Fragment>
  )
}

export default withGetUserMedia({ constraints: { audio: true } })(RecordAudio)
