import * as m from './matrix.js';

class Perceptron {
  
  constructor(points) {
    this.weights = [0,0];
    this.points = points;
    this.weightsList = [];
    this.pointsList = [];
    this.maxIterations = this.points.length;
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
  }
}

export { Perceptron };
