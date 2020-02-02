export function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let newIndex = parseInt(Math.random()*arr.length);
    let temp = arr[i];
    arr[i] = arr[newIndex];
    arr[newIndex] = temp;
  }
}

let precision = 3;
export function getPoints(n, dim) {
  let points = []
  for (let i = 0; i < n; i++) {
    let p = []
      for (let j = 0; j < dim; j++) {
        p.push(Math.random().toFixed(precision));
      }
    points.push([p]);
    }
  return(points);
}

export function separateLabels(points) {
  // Slope modifier
  let slope = 1;
  if (Math.random() < 0.5) {
    slope = (Math.random()+0.01).toFixed(precision);
  }
  else {
    slope = (4*Math.random()+1).toFixed(precision);
  }
  points.forEach(p => {
    if (p[0][1] > slope*p[0][0]) {
      p.push(1);
    }
    else {
      p.push(-1);
    }
  });
  return(slope)
}

// Assumes two lists of same length [n x 1] + [n x 1]
export function addV(v1, v2) {
  let result = [];
    for (let i = 0; i < v1.length; i++) {
      result.push(v1[i]+v2[i]);
    }
    return(result);
}

// Assumes two lists of same length [n x 1] * [n x 1]
export function dotV(v1, v2) {
  let result = 0;
    for (let i = 0; i < v1.length; i++) {
      result += v1[i]*v2[i];
    }
    return(result);
}