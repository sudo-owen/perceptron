// Utilities
export function isVector(arr) {
  if (! Array.isArray(arr[0])) {
    throw 'inner value is not array'
  }
  return(arr.length === 1);
}

export function isMatrix(arr) {
  return(!isVector(arr));
}

export function shape(arr) {
  if (! Array.isArray(arr[0])) {
    throw 'inner value is not array'
  }
  return([arr.length, arr[0].length]);
}

function same(shape1, shape2) {
  return(shape1[0] === shape2[0] && shape1[1] === shape2[1]);
}

export function tp(arr) {
  let newArray = [],
      origArrayLength = arr.length,
      arrayLength = arr[0].length,
      i;
  for(i = 0; i < arrayLength; i++){
    newArray.push([]);
  }
  for(i = 0; i < origArrayLength; i++){
    for(let j = 0; j < arrayLength; j++){
      newArray[j].push(arr[i][j]);
    }
  }
  return(newArray);
}

export function add(arr1, arr2) {
  function addVector(v1, v2) {
    if (v1.length !== v2.length) {
      throw new RangeError('two vectors are not the same dimensions'); 
    }
    let result = [];
    for (let i = 0; i < v1.length; i++) {
      result.push(v1[i]+v2[i]);
    }
    return(result);
  }
  // matrix plus matrix
  if (isMatrix(arr1) && isMatrix(arr2)) {
    return(arr1.map(function(x, index) {
      return(addVector(x, arr2[index]));
    }));
  }
  // Auto broadcasting if arr1 or arr2 are vectors (but not both)
  else if (isMatrix(arr1)) {
    return(arr1.map(function(x) {
      return(addVector(x, arr2[0]));
    }));
  }
  else if (isMatrix(arr2)) {
    return(arr2.map(function(x) {
      return(addVector(x, arr1[0]));
    }));
  }
  else {
    return([addVector(arr1[0], arr2[0])]);
  }
}

export function dot(arr1, arr2) {

  // Operates on lists that are the same size, e.g. [n x 1] and [n x 1]
  function dotVector(v1, v2) {
    if (v1.length !== v2.length) {
      throw new RangeError('two vectors are not the same dimensions'); 
    }
    let result = 0;
    for (let i = 0; i < v1.length; i++) {
      result += v1[i]*v2[i];
    }
    return(result);
  }
  if (isMatrix(arr1) && isMatrix(arr2)) {
    return(arr1.map(function(x) {
      // Note we wrap the single vector in an array to keep compatibility
      return(dot([x], arr2TP));
    }));
  }
  else if (isMatrix(arr1)) {
    return(arr1.map(function(x) {
      return(dotVector(x, arr2[0]));
    }));
  }
  else if (isMatrix(arr2)) {
    return(arr2.map(function(x) {
      return(dotVector(x, arr1[0]));
    }));
  }
  else {
    return([dotVector(arr1[0], arr2[0])]);
  }
}
