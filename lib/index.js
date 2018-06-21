var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import 'webrtc-adapter';
import React from 'react';
import dataURLToBlob from './dataURLToBlob';
import consoleErrors from './consoleErrors';

var VIDEO_MIME_TYPE = 'video/webm;codecs=vp8';

var DEFAULT_CONSTRAINTS = {
  audio: false,
  video: {
    facingMode: 'user'
  }
};

export var withGetUserMedia = function withGetUserMedia() {
  var HOCProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (Component) {
    var GetUserMedia = function (_React$Component) {
      _inherits(GetUserMedia, _React$Component);

      function GetUserMedia(props) {
        _classCallCheck(this, GetUserMedia);

        var _this = _possibleConstructorReturn(this, (GetUserMedia.__proto__ || Object.getPrototypeOf(GetUserMedia)).call(this, props));

        Object.assign(_this, {
          registerElements: _this.registerElements.bind(_this),
          stopStream: _this.stopStream.bind(_this),
          getUserMedia: _this.getUserMedia.bind(_this),
          takePhoto: _this.takePhoto.bind(_this),
          handleGrantedPermissions: _this.handleGrantedPermissions.bind(_this),
          handleDeniedPermissions: _this.handleDeniedPermissions.bind(_this),

          startRecording: _this.startRecording.bind(_this),
          stopRecording: _this.stopRecording.bind(_this),
          createMediaObjectURL: _this.createMediaObjectURL.bind(_this),
          createMediaRecorder: _this.createMediaRecorder.bind(_this),

          constraints: HOCProps.constraints || DEFAULT_CONSTRAINTS,

          state: {
            recording: false,
            permitted: false
          }
        });
        return _this;
      }

      _createClass(GetUserMedia, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.registerElements();
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.stopStream();
        }
      }, {
        key: 'registerElements',
        value: function registerElements() {
          if (HOCProps.streamElementId) {
            console.log(window);

            this.streamElementId = document.getElementById(HOCProps.streamElementId);
            this.streamElementId.setAttribute('autoPlay', true);
            this.streamElementId.setAttribute('playsInline', true);
          }
        }
      }, {
        key: 'stopStream',
        value: function stopStream() {
          if (!this.stream) return consoleErrors.missingStream('stopStream');

          this.stream.getTracks().forEach(function (track) {
            return track.stop();
          });
          this.stream = null;
          this.setState({ recording: false });
        }
      }, {
        key: 'getUserMedia',
        value: function getUserMedia() {
          navigator.mediaDevices.getUserMedia(this.constraints).then(this.handleGrantedPermissions).catch(this.handleDeniedPermissions);
        }
      }, {
        key: 'handleDeniedPermissions',
        value: function handleDeniedPermissions(stream) {
          this.setState({ permitted: false });
        }
      }, {
        key: 'handleGrantedPermissions',
        value: function handleGrantedPermissions(stream) {
          this.stream = stream;
          this.setState({ permitted: true });

          this.toggleStreamSrcObject();
        }
      }, {
        key: 'createMediaRecorder',
        value: function createMediaRecorder(stream) {
          if (!window.MediaRecorder) {
            var AudioRecorder = require('audio-recorder-polyfill');
            return new AudioRecorder(stream);
          }

          if (!this.constraints.video) {
            return new window.MediaRecorder(stream);
          }

          return new window.MediaRecorder(stream, { mimeType: VIDEO_MIME_TYPE });
        }
      }, {
        key: 'createMediaObjectURL',
        value: function createMediaObjectURL(_ref) {
          var data = _ref.data;

          if (!data || data.size <= 0) return;

          if (data.type !== VIDEO_MIME_TYPE) {
            return this.setState({ recordedMedia: URL.createObjectURL(data) });
          }

          var videoBlob = new Blob([data], { type: 'video/webm' });
          var recordedMedia = URL.createObjectURL(videoBlob);
          return this.setState({ recordedMedia: recordedMedia });
        }
      }, {
        key: 'startRecording',
        value: function startRecording() {
          if (!this.stream) return consoleErrors.missingStream('startRecording');

          this.mediaRecorder = this.createMediaRecorder(this.stream);
          this.mediaRecorder.addEventListener('dataavailable', this.createMediaObjectURL);
          this.mediaRecorder.start();
          this.setState({ recording: true });
        }
      }, {
        key: 'stopRecording',
        value: function stopRecording() {
          this.mediaRecorder.stop();
          this.setState({ recording: false });
        }
      }, {
        key: 'takePhoto',
        value: function takePhoto() {
          if (!this.stream) return consoleErrors.missingStream('takePhoto');

          var _streamElementId = this.streamElementId,
              videoWidth = _streamElementId.videoWidth,
              videoHeight = _streamElementId.videoHeight;

          var canvasElement = document.createElement('canvas');
          canvasElement.height = videoHeight;
          canvasElement.width = videoWidth;
          canvasElement.getContext('2d').drawImage(this.streamElementId, 0, 0);

          var photo = canvasElement.toDataURL('image/png');
          var photoBlob = dataURLToBlob(photo);

          this.setState({ photo: photo, photoBlob: photoBlob });
        }
      }, {
        key: 'toggleStreamSrcObject',
        value: function toggleStreamSrcObject() {
          if (!this.streamElementId) return consoleErrors.missingElement('streamElementId');

          if (!this.stream) {
            this.streamElementId.srcObject = null;
          }

          this.streamElementId.srcObject = this.stream;
        }
      }, {
        key: 'render',
        value: function render() {
          return React.createElement(Component, Object.assign({
            stopStream: this.stopStream,
            getUserMedia: this.getUserMedia,
            takePhoto: this.takePhoto,
            startRecording: this.startRecording,
            stopRecording: this.stopRecording
          }, HOCProps, this.state, this.props));
        }
      }]);

      return GetUserMedia;
    }(React.Component);

    var displayName = Component.displayName || Component.name || 'Component';
    GetUserMedia.displayName = 'withGetUserMedia(' + displayName + ')';
    return GetUserMedia;
  };
};