import * as m from './matrix.js';

class MaxoverPerceptron {
  
  constructor(points) {
    this.points = points;
    this.weights = [-0.1, 0.1];
    this.weightsList = [];
    this.pointsList = [];
    this.errList = [];
  }

  hopfieldVector(points) {
    let result = [0,0];
    for (let p of points) {
      result = m.addV(result, p[0]);
    }
    let normalResult = [0,0];
    normalResult[0] = 1;
    normalResult[1] = -result[0]/result[1];
    let length = m.l2norm(normalResult);
    return(normalResult.map(function(a) {
      return(a/length);
    }));
  }

  updateWeights1() {
    let sigma;
    let minProduct = Math.pow(10, 1000);
    for (let p of this.points) {
      // Get value of data point * label
      let currSigma =  p[0].map(x => x*p[1]);
      let product = m.dotV(this.weights, currSigma);
      if (product < minProduct) {
        minProduct = product;
        sigma = currSigma;
      }
    }
    let val = (2 - minProduct)/(m.l2norm(this.weights)**2 - minProduct);
    let r = m.addV(sigma, this.weights.map(x => x*val));
    if (r !== undefined) {
      this.weights = m.addV(this.weights, r);
    }
  }

  updateWeights2() {
    m.shuffle(this.points);
    let sigma;
    let minProduct;
    let delta = 0.1;
    for (let p of this.points) {
      // Get value of data point * label
      let currSigma =  p[0].map(x => x*p[1]);
      let product = m.dotV(this.weights, currSigma);
      if (product/m.l2norm(this.weights) < delta) {
        minProduct = product;
        sigma = currSigma;
        this.pointsList.push(p[0]);
        break;
      }
    }
    let val = (2 - minProduct)/(m.l2norm(this.weights)**2 - minProduct);
    let r = m.addV(sigma, this.weights.map(x => x*val));
    if (r !== undefined) {
      this.weights = m.addV(this.weights, r);
    }
  }

  updateWeights3() {
    let sigma;
    let maxProduct = -Math.pow(10, 999);
    let delta = -0.15;
    for (let p of this.points) {
      // Get value of data point * label
      let currSigma =  p[0].map(x => x*p[1]);
      let product = m.dotV(this.weights, currSigma);
      if (product/m.l2norm(this.weights) < delta && product > maxProduct) {
        maxProduct = product;
        sigma = currSigma;
      }
    }
    let val = (2 - maxProduct)/(m.l2norm(this.weights)**2 - maxProduct);
    let r = m.addV(sigma, this.weights.map(x => x*val));
    if (r !== undefined) {
      this.weights = m.addV(this.weights, r);
    }
  }

  train() {
    let MAX_ITERS = 500;
    let delta = 0.995;
    for (let i = 0; i < MAX_ITERS; i++) {
      this.updateWeights2();
      this.weightsList.push(this.weights);
      // Early stopping once every 2 iters to check for convergence
      if (i%2 === 1 && i > this.points.length/2) {
        let prevWeights = this.weightsList[this.weightsList.length-2];
        let product = m.dotV(this.weights, prevWeights)**2;
        let w1 = m.dotV(this.weights, this.weights);
        let w2 = m.dotV(prevWeights, prevWeights);
        let result = (product/(w1*w2));
        if (result < 1/delta && result > delta) {
          break;
        }
      }
    }
    for (let w of this.weightsList) {
      this.errList.push(this.err(w));
    }
  }

  predict(p, weights) {
    return(Math.sign(m.dotV(weights, p[0])));
  }

  err(weights) {
    let numWrong = 0;
    for (let p of this.points) {
      if (this.predict(p, weights) !== p[1]) {
        numWrong++;
      }
    }
    return((numWrong/this.points.length).toFixed(3));
  }
}

export { MaxoverPerceptron };