import * as m from './matrix.js';

class VotedPerceptron {

  constructor(points, maxIterations) {
    this.weights = [0,0];
    this.points = points;
    this.weightsList = [];
    this.votesList = [];
    this.maxIterations = maxIterations;
  }

  updateWeights() {
    m.shuffle(this.points);
    let vote = 0;
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let label = p[1];
      if (Math.sign(m.dotV(this.weights, p[0])) != label) {
        this.weights = m.addV(this.weights, p[0].map(x => x * label));
        if (vote > 0) {
          this.weightsList.push(this.weights);
          this.votesList.push(vote);
          vote = 0;
        }
      }
      else {
        vote += 1;
      }
    }
  }

  train() {
    for (let i = 0; i < this.maxIterations; i++) {
      this.updateWeights();
    }
  }

  predict(p) {
    let total = 0;
    for (let i = 0; i < this.weightsList.length; i++) {
      total += this.votesList[i]*(m.dotV(this.weightsList[i], p));
    }
    return(Math.sign(total));
  }

  err() {
    let numWrong = 0;
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let label = p[1];
      if (this.predict(p) != label) {
        numWrong += 1;
      }
    }
    return((numWrong/this.points.length).toFixed(3));
  }

}

export { VotedPerceptron };