export default function dataURLToBlob(dataURL) {
  var byteString = atob(dataURL.split(',')[1]);
  var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

  var arrayBuffer = new ArrayBuffer(byteString.length);
  var uint8Array = new Uint8Array(arrayBuffer);

  for (var i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mimeString });
}