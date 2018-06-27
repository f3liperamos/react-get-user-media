0.1.0 ~ 0.1.8

  - First release, publishing on NPM, solving bundle errors, and etc

0.1.9

  - Creating github repositoy

0.1.10

  - Removing `registerElements` function, now streamElementId will be checked upon use. eg.: Granting user permission, taking snaphot, stopping stream.

  - Including a test env into .babelrc preset.

  - Renaming `missingElement` no `elementNotFound` on consoleErrors.

0.1.11

  - `StopStream` does not trigger an error anymore if no stream is found

  - Updating dependencies

0.1.12

  - If `getUserMedia` is called when `this.asked`, `this.permitted` is true and `this.stream` exists, triggers this.handleGrantedPermissions. (Should we provide an "attachStream" instead? Or expose toggleStreamSrcObject?)

0.1.13

  - If `getUserMedia` is called when `this.asked`, `this.permitted` is true and `this.stream` exists, triggers this.toggleStreamSrcObject (0.1.12 did not went well)

0.1.14

  - Removing early returns from `get streamElement`, it breaks toggleStreamSrcObject if you browse back. getElementById should be called every time due to "live node" behavior

0.1.15

  - Exposing blob as `recordedBlob` for audio and video

0.1.16

  - Adding mimeType checking when audio record is chosen

  - Creating blob with correct mimeTypes
