import React from 'react'
import { withGetUserMedia } from '../src/index'

const RecordAudio = ({ getUserMedia, permitted, startRecording, stopRecording, recording, recordedMedia }) => {
  function recordFlow () {
    if (!permitted) return getUserMedia()
    if (!recording) return startRecording()
    stopRecording()
  }

  function recordFlowText () {
    if (!permitted) return 'Grant permissions: audio'
    if (!recording) return 'Start Recording'
    return 'Stop Recording'
  }

  return (
    <React.Fragment>
      <h1>Audio</h1>
      <div className='buttonBox'>
        <button onClick={recordFlow}>{recordFlowText()}</button>
      </div>
      <h3>RecordStatus: {recording ? 'TRUE' : 'FALSE'}</h3>
      <audio id='audioId' controls src={recordedMedia} />
    </React.Fragment>
  )
}

export default withGetUserMedia({ constraints: { audio: true } })(RecordAudio)
