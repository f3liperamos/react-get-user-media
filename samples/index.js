import 'webrtc-adapter'
import React from 'react'
import ReactDOM from 'react-dom'

import RecordAudio from './Audio'
import RecordVideo from './Video'
import Snapshot from './Snapshot'

ReactDOM.render(
  <React.Fragment>
    <RecordAudio />
    <RecordVideo />
    <Snapshot />
  </React.Fragment>,
  document.getElementById('root')
)
