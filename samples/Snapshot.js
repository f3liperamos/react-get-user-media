import React from 'react'
import { withGetUserMedia } from '../src/index'

const Snapshot = ({ getUserMedia, permitted, takePhoto, photo }) => {
  function takePhotoFn () {
    if (!permitted) return getUserMedia()
    takePhoto()
  }

  function takePhotoText () {
    if (!permitted) return 'Grant permissions: photo'
    return 'Take Photo'
  }

  return (
    <React.Fragment>
      <h1>Snapshot</h1>
      <div className='buttonBox'>
        <button onClick={takePhotoFn}>{takePhotoText()}</button>
      </div>
      <video id='snap' style={{ width: '320px' }} />
      <img src={photo} />
    </React.Fragment>
  )
}

export default withGetUserMedia({
  streamElementId: 'snap',
  constraints: { video: { facingMode: 'user' } }
})(Snapshot)
