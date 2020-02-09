export function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let newIndex = parseInt(Math.random()*arr.length);
    let temp = arr[i];
    arr[i] = arr[newIndex];
    arr[newIndex] = temp;
  }
}

let precision = 3;
export function getPoints(n, margin = 0.97) {
  let slope;
  let points = [];
  if (Math.random() < 0.5) {
    slope = (Math.random()+0.1).toFixed(precision);
  }
  else {
    slope = (2*Math.random()+1).toFixed(precision);
  }
  // Points above the hyperplane
  for (let i = 0; i < parseInt(n/2); i++) {
    let x = Math.random().toFixed(3);
    // Ensure that the y-values don't got past [0,1]
    // we do this by ensuring we only generate x-values in
    // a valid range.
    if (slope > 1) {
      x = (Math.random()*(1/slope)).toFixed(precision);
    }
    let min = (slope*x)*(1/margin);
    let max = 1-min;
    let y = (Math.random()*max + min).toFixed(precision);
    points.push([[x, y], 1]);
  }
  // Points below the hyperplane
  for (let i = 0; i < parseInt(n/2); i++) {
    let x = Math.random().toFixed(3);
    let min = 0;
    let max = (slope*x)*margin;
    let y = (Math.random()*max + min).toFixed(precision);
    points.push([[x, y], -1]);
  }
  // shuffle(points);
  return([slope, points]);
}

export function flipLabels(points, fraction) {
  shuffle(points);
  for (let i = 0; i < parseInt(points.length*fraction); i++) {
    points[i][1] *= -1;
  }
}

// Assumes two lists of same length [n x 1] + [n x 1]
export function addV(v1, v2) {
  let result = [];
    for (let i = 0; i < v1.length; i++) {
      result.push(Number(v1[i]) + Number(v2[i]));
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

export function l2norm(v1) {
  return(Math.sqrt(v1.reduce(function(acc, curr) {
    return(acc + curr*curr);
  }, 0)));
}