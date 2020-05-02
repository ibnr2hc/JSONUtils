exports.recursionDeleteEmptyObject = function(obj, keyName) {

  if (keyName) {
    if (!(getType(obj[keyName]) === "array" || getType(obj[keyName]) === "object")) {
      return null;
    }

    // for Array
    if (getType(obj[keyName]) === "array") {
      let processedArray = [];

      obj[keyName].forEach(thisObj => {
        recursionDeleteEmptyObject(thisObj);

        // Existing obj
        if (thisObj || !isEmpty(thisObj)) {
          processedArray.push(thisObj)
        }
      })

      // Delete key if array is empty
      const existingData = getArrayByDeleteEmptyData(processedArray);
      if (!existingData.length) {
        delete obj[keyName];
      } else if (existingData.length) {
        obj[keyName] = existingData;
      }
      return null;
    }

    // for Object
    if (getType(obj[keyName] === "object")) {

      const keys = Object.keys(obj[keyName]);
      keys.forEach(key => {
        recursionDeleteEmptyObject(obj[keyName], key);
      })

      // Delete key if object is empty
      if (isEmpty(obj[keyName])) {
        delete obj[keyName];
      }

      return null;
    }

  } else if (getType(obj) === "object") {
    const keys = Object.keys(obj)
    keys.forEach(key => {
      recursionDeleteEmptyObject(obj, key);
    })
  }
}

function getArrayByDeleteEmptyData(obj) {
  let existingData = [];
  obj.forEach(oneObj => {
    if (!isEmpty(oneObj)) {
      existingData.push(oneObj);
    }
  })
  return existingData;
}

function isEmpty(obj) {
  return !Object.keys(obj).length ? true : false;
}

function getType(obj) {
  const toString = Object.prototype.toString;
  return toString.call(obj).slice(8, -1).toLowerCase();
}
