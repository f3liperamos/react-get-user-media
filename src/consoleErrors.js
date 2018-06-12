export default {
  missingElement (element) {
    console.error(`@withGetUserMedia: Missing ID on ${element} tag`)
  },
  missingStream (methodName) {
    console.error(
      `@withGetUserMedia: [Method: ${methodName}] MediaStream not found
Use props.getUserMedia to create one before using this method`
    )
  }
}
