export default {
  missingElement: function missingElement(element) {
    console.error("@withGetUserMedia: Missing ID on " + element + " tag");
  },
  missingStream: function missingStream(methodName) {
    console.error("@withGetUserMedia: [Method: " + methodName + "] MediaStream not found\nUse props.getUserMedia to create one before using this method");
  }
};