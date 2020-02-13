import * as m from './matrix.js';

class Perceptron {
  
  constructor(points) {
    this.weights = [0,0];
    this.points = points;
    this.weightsList = [];
    this.pointsList = [];
    this.maxIterations = Math.max(50, this.points.length*2);
    this.errList = [];
  }

  updateWeights() {
    m.shuffle(this.points);
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let label = p[1];
      if (Math.sign(m.dotV(this.weights, p[0])) != label) {
        this.weights = m.addV(this.weights, p[0].map(x => x * label));
        this.pointsList.push(p[0]);
        return(true);
      }
    }
    // else, return that all are correct
    return(false);
  }

  train() {
    while(this.updateWeights()) {
      this.weightsList.push(this.weights);
      this.maxIterations -= 1;
      if (this.maxIterations == 0) {
        break;
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

export { Perceptron };
